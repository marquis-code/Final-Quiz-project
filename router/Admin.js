const express = require("express");
const adminRouter = express.Router();
const passport = require("passport");
const JWT = require("jsonwebtoken");
const passportConfig = require("../passport");
const Quiz_Statistics = require("../models/QuizStatistics");
const Admin = require("../models/Admin");
const User = require("../models/User");
 const { registerSchema } = require("../models/validations/authValidation");
 const { loginSchema } = require("../models/validations/loginValidation");
const nodemailer = require("nodemailer");
const _ = require('lodash');
const nodemailerMailgun = require('nodemailer-mailgun-transport');
require("dotenv").config();
const moment = require('moment');

 const signToken = (userID) => {
  return JWT.sign(
    {
      iss: process.env.SECRET,
      sub: userID,
    },
    process.env.SECRET,
    {
      expiresIn: "1h",
    }
  );
};


adminRouter.post('/adminRegister', (req, res) => {
  const { username, matric, password, email, role } = req.body;
  const validationResult = registerSchema.validate(req.body, {
    abortEarly: false,
  });

  if (validationResult.error) {
    return res.status(400).json({
      message: {
        msgBody:
          "Registeration Failed !!! Please Enter All Fields Correctly.",
        msgError: true,
      },
    });
  }

  if (matric.toString().length !== 9) {
    return res.status(400).json({
      message: {
        msgBody: "Please!!! Enter A Valid Matric Number",
        msgError: true,
      },
    });
  }

  Admin.findOne({ matric })
  .then((user) => {
  if(user){
    return res.status(400).json({
      message: {
        msgBody: "Sorry!! User Already Exist",
        msgError: true,
      },
    });
  }else{
    const newUser = new Admin({ username, matric, password, email, role });
    newUser
      .save()
      .then(() => {
        res.status(201).json({
          message: {
            msgBody:
              "Congratulations Admin Account successfully created! Please signin",
            msgError: false,
          },
        });
      })
      .catch(() => {
    return res.status(500).json({
          message: {
            msgBody: "Something Went Wrong",
            msgError: true,
          },
        }); 
      });
  }
  }).catch(()=>{
  return res.status(500).json({
      message: {
        msgBody: "Something Went Wrong",
        msgError: true,
      },
    });
  })
})

adminRouter.post( "/adminLogin", 
passport.authenticate("local-admin", {
    session: false,
  }),
  (req, res) => {
    const { matric } = req.body;
    const validationResult = loginSchema.validate(req.body, {
      abortEarly: false,
    });
   if (validationResult.error) {
       return res.status(400).json({
        message: {
          msgBody:  "Login Failed!! Please Enter All Fields information Correctly.",
          msgError: true,
        },
      });
    }

    if (matric.toString().length !== 9) {
      return res.status(400).json({
        message: {
          msgBody: "Please!!! Enter A Valid Matric Number",
          msgError: true,
        },
      });
    }
      if (req.isAuthenticated()) {
        const { _id, matric, role } = req.user;
        const token = signToken(_id);
        res.cookie("access_token", token, {
          httpOnly: true,
          sameSite: true
        });
        res.status(200).json({
          msgBody: "Congratulations Admin You are sucessfuly logged In",
          isAuthenticated: true,
          user: {
            matric,
            role,
          },
        });
      } else {
        res.status(403).json({
          msgBody: "Sorry Login was not successful",
          isAuthenticated: false,
        });
      }
  }
);

adminRouter.get(
  "/authenticated",
  passport.authenticate("local-adminJwt", {
    session: false,
  }),
  (req, res) => {
      const { matric, role } = req.user;
      res.status(200).json({
        isAuthenticated: true,
        user: {
          matric,
          role,
        },
      });
  }
);

adminRouter.get(
  "/admin",
  passport.authenticate("local-adminJwt", {
    session: false,
  }),
  (req, res) => {
      if (req.user.role === "admin") {
        res.status(200).json({
          message: {
            msgBody: "Welcome to the Admin Page",
            msgError: false,
          },
        });
      }
      return res.status(403).json({
        message: {
          msgBody: "You're not authorized to access the admin page",
          msgError: true,
        },
      });
  }
);

//To delete user from database
adminRouter.delete('/deleteUser/:id', passport.authenticate("local-adminJwt", {
  session: false,
}), async (req, res) => {
     const _id = req.params.id;
     const deletedUser =await User.deleteOne({_id}).exec();
  
     if(deletedUser.deletedCount === 0){
        return res.status(404).json(`User With ID ${_id} does not Exist`);
     }else{
        res.status(200).json( `User With ID ${_id} Was Successfully Deleted`);
     }
    }) 


//To delete user statistics from database
adminRouter.delete('/deleteUserStat/:id', passport.authenticate("local-adminJwt", {
  session: false,
}), async (req, res) => {
     const _id = req.params.id;
     const deletedUserStat =await Quiz_Statistics.deleteOne({_id}).exec();
  
     if(deletedUserStat.deletedCount === 0){
        return res.status(404).json(`Quiz Statistics With ID ${_id} does not Exist`);
     }else{
        res.status(200).json( `Quiz Statistics With ID ${_id} Was Successfully Deleted`);
     }
    }) 



adminRouter.get('/allUsers', passport.authenticate("local-adminJwt", {
  session: false,
}), async(req, res)=>{
    const allUsers = await User.find().sort({matric : 1});
     return res.status(200).json(allUsers);
     });

     //Admin Logout
     adminRouter.get(
      "/adminLogout",
      passport.authenticate("local-adminJwt", {
        session: false,
      }),
      (req, res) => {
          res.clearCookie("access_token");
          res.json({
            msgBody: "Admin sucessfully Loged out",
            user: {
              matric: "",
              role: "",
            },
            success: true,
          });
      }
    );   

//Get quiz statistics
 adminRouter.get('/playerStat', passport.authenticate("local-adminJwt", {
  session: false,
}), async(req, res)=>{

    const allStat = await Quiz_Statistics.find().sort({score: 1, date: 1});
     return res.status(200).json(allStat);
     }); 

    adminRouter.put('/forgot', (req, res) => {
        const { email } = req.body;
    
        Admin.findOne({ email }, (err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    message: {
                      msgBody: 'Admin with that email does not exist',
                      msgError: true,
                    }
                });
            }
  
             const token = JWT.sign({ _id: user._id }, "NimelssaOnly", { expiresIn: '30m' });
       const mailOptions = {
        from: 'Nimelssa Quiz <no-reply@nimelssaQuiz.com>',
        to: email,
        subject: `Admin Reset Password`,
        html: `
        <div>
          <h1>Reset password</h1>
          <p>A password reset event has been triggered. The password reset window is limited to thirty minutes.</p>
          <p>If you do not reset your password within thirty minutes, you will need to submit a new request.</p>
          <p>To complete the password reset process, visit the following link:</p>
          <p>${process.env.CLIENT_URL}/adminReset/${token}</p>
          <hr />
          <p>This email may contain sensetive information</p>
          <p>${process.env.CLIENT_URL}</p>
          <p>Created on = ${moment().format('DD/MM/YYYY')}</p>
        </div>
        `,
    } 
      
            return user.updateOne({ resetPasswordLink: token }, (err, success) => {
                if (err) {
                    console.log('RESET PASSWORD LINK ERROR', err);
                    return res.status(400).json({
                       message: {
                        msgBody: 'Database connection error on Admin password forgot request',
                        msgError: true,
                      }
                    });
                } else {

                  const auth = {
                    auth: {
                      api_key: process.env.Api_key,
                      domain: process.env.Domain
                    }
                  }

        
                  
                  let transporter = nodemailer.createTransport(nodemailerMailgun(auth));
                  
      
                  transporter.sendMail(mailOptions)
                  .then(() => {
                    // console.log('SIGNUP EMAIL SENT', sent)
                    return res.json({
                        message: {
                          msgBody: `Please check  ${email} inbox to complete the reset.Follow the instruction to activate your account`,
                          msgError: false,
                        },
                    });
                })
                .catch(() => {
                   
                    return res.status(500).json({
                      message: {
                        msgBody: "Something went wrong" ,
                        msgError: true,
                      }
                  });
                });
                
                }
            });
        });
    })
    

    adminRouter.put('/reset', (req, res)=>{
      const { resetPasswordLink, newPassword } = req.body;
    
      if (resetPasswordLink) {
          JWT.verify(resetPasswordLink, process.env.SECRET, function(err, decoded) {
              if (err) {
                  return res.status(400).json({
                      message: {
                        msgBody: "Expired link. Try again" ,
                        msgError: true,
                      }
                  });
              }
    
              Admin.findOne({ resetPasswordLink }, (err, user) => {
                  if (err || !user) {
                      return res.status(400).json({
                          message: {
                            msgBody: "Something went wrong. Try later" ,
                            msgError: true,
                          }
                      });
                  }
    
                  const updatedFields = {
                      password: newPassword,
                      resetPasswordLink: ''
                  };
    
                  user = _.extend(user, updatedFields);
    
                  user.save((err, result) => {
                      if (err) {
                          return res.status(400).json({
                              message: {
                                msgBody: "Error resetting Admin password" ,
                                msgError: true,
                              }
                          });
                      }
                      res.status(200).json({
                          message: {
                            msgBody: `Congratulations Admin! Now you can login with your new password`,
                            msgError: false,
                          }
                      });
                  });
              });
          });
      }
    })
     
module.exports = adminRouter;
