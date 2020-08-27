const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const JWT = require('jsonwebtoken');
const passportConfig = require('../passport');
const User = require('../models/User');

const signToken = userID => {
    return JWT.sign({
        iss: "NimelssaOnly",
        sub: userID
    }, "NimelssaOnly", {
        expiresIn: "1h"
    });
}

userRouter.post('/register', (req, res) => {
    const {
        username,
        matric,
        password,
        role
    } = req.body;


    if (!username || !matric|| !password || !role){
        return res.status(400).json({
            message: {
                msgBody: 'Please!!! Enter All Fields Corretly',
                msgError: true
            }
        });
    }

    if (matric.length != '9'){
        return res.status(400).json({
            message: {
                msgBody: 'Please!!! Enter A Valid Matric Number',
                msgError: true
            }
        });
    }
    
    User.findOne({
        matric
    }, (err, user) => {
        if (err)
            res.status(500).json({
                message: {
                    msgBody: "Error has occured",
                    msgError: true
                }
            });
        if (user)
            return res.status(400).json({
                message: {
                    msgBody: "Sorry!! User Already Exist",
                    msgError: true
                }
            });
        else {
            const newUser = new User({
                username,
                matric,
                password,
                role
            });
            newUser.save(err => {
                if (err)
                   return res.status(500).json({
                        message: {
                            msgBody: "Error has occured",
                            msgError: true
                        }
                    });
                else
                   res.status(201).json({
                        message: {
                            msgBody: "Congratulations Account successfully created! Please signin",
                            msgError: false
                        }
                    }); 
            });
        }
    });
});

userRouter.post('/login', passport.authenticate('local', {
    session: false
}), (req, res) => {
    if (req.isAuthenticated()) {
        const {
            _id,
            matric,
            role
        } = req.user;
        const token = signToken(_id);
        res.cookie('access_token', token, {
            httpOnly: true,
            sameSite: true
        });
      res.status(200).json({
            msgBody: "Congratulations You are sucessfuly logged In",
            isAuthenticated: true,
            user: {
                matric,
                role
            }
        }); 
    }else{
        res.status(400).json({
            msgBody: "Login was not sucessful",
            isAuthenticated: false
        });
    }
});

userRouter.get('/logout', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    res.clearCookie('access_token');
    res.json({
        msgBody: "You are sucessfully Loged out",
        user: {
            matric: "",
            role: ""
        },
        success: true
    });
});

userRouter.get('/admin', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    if (req.user.role === 'admin') {
        res.status(200).json({
            message: {
                msgBody: 'Welcome to the Admin Page',
                msgError: false
            }
        });
    } else
        res.status(403).json({
            message: {
                msgBody: "You're not authorized to access the admin page",
                msgError: true
            }
        });
});

userRouter.get('/authenticated', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const {
        matric,
        role
    } = req.user;
  res.status(200).json({
        isAuthenticated: true,
        user: {
            matric,
            role
        }
    });
    res.status(200).redirect('/user/play/quiz');
});

//Quiz routes
userRouter.get('/quiz', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    if (req.isAuthenticated() || req.user.role === 'admin') {
        res.status(200).json({
            message: {
                msgBody: "Welcome to quiz page",
                msgError: false
            }
        })
    } else
         res.status(403).redirect('/login');
});

userRouter.get('/quizSummary', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    if (req.isAuthenticated() || req.user.role === 'admin') {
       res.status(200).json({
            message: {
                msgBody: "Welcome to quiz summary page",
                msgError: false
            }
        });
        res.redirect('/quizSummary');
    } else
        res.status(403).json({
            message: {
                msgBody: "Sorry you cant access this page Please Login",
                msgError: true
            }
        }); 
});

userRouter.get('/instructions', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    if (req.isAuthenticated() || req.user.role === 'admin') {
        res.status(200).json({
            message: {
                msgBody: "Welcome to quiz Instructions page",
                msgError: false
            }
        });
    } else
       res.status(403).json({
            message: {
                msgBody: "Sorry you cant access this page Please Login",
                msgError: true
            }
        });
});


module.exports = userRouter;

