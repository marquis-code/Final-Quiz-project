const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const JWT = require("jsonwebtoken");
const passportConfig = require("../passport");
const User = require("../models/User");
const Quiz_Statistics = require("../models/QuizStatistics");
const { registerSchema } = require("../models/validations/authValidation");
const { loginSchema } = require("../models/validations/loginValidation");
const { Passport } = require("passport");
const nodemailer = require("nodemailer");
const nodemailerMailgun = require('nodemailer-mailgun-transport');
const _ = require('lodash');
require("dotenv").config();
const moment = require('moment');

const signToken = (userID) => {
  return JWT.sign(
    {
      iss: process.env.SECRETEkEY,
      sub: userID,
    },
    process.env.SECRETEkEY,
    {
      expiresIn: "1h",
    }
  );
};

//User registeration
userRouter.post("/register", (req, res) => {
    const { username, matric, password, email, role } = req.body;
    const validationResult = registerSchema.validate(req.body, {
      abortEarly: false,
    });
    if (validationResult.error) {
      return res.status(400).json({
        message: {
          msgBody:
            "Oops!!! Registeration Failed Please Enter All Fields information Correctly.",
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

    User.findOne({ matric })
      .then((user) => {
        if (user) {
          return res.status(400).json({
            message: {
              msgBody: "Oops!! User Already Exist",
              msgError: true,
            },
          });
        } else {
          const newUser = new User({ username, matric, password, email, role });
          newUser
            .save()
            .then(() => {
              res.status(201).json({
                message: {
                  msgBody:
                    "Congratulations Account successfully created! Please signin",
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
      })
      .catch(() => {
        return res.status(500).json({
          message: {
            msgBody: "Something went wrong" ,
            msgError: true,
          }
      });
      });
});

//User Login
userRouter.post(
  "/userLogin",
  passport.authenticate("local-user", {
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
            msgBody:
              "Oops Login Failed!! Please Enter All Fields information Correctly.",
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
          msgBody: "Congratulations You are sucessfuly logged In",
          msgError: false,
          isAuthenticated: true,
          user: {
            matric,
            role,
          }
        });
      } else {
        res.status(400).json({
          msgBody: "Login was not successful",
          isAuthenticated: false,
          msgError: true,
        });
      }
  }
);

userRouter.get(
  "/logout",
  passport.authenticate("local-userJwt", {
    session: false,
  }),
  (req, res) => {
      res.clearCookie("access_token");
      res.json({
        msgBody: "You are sucessfully Logged out",
        user: {
          matric: "",
          role: "",
        },
        success: true,
      });
  }
);



 userRouter.get(
  "/authenticated",
  passport.authenticate("local-userJwt", {
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

userRouter.post(
  "/quizStat",
  passport.authenticate("local-userJwt", {
    session: false,
  }),
  (req, res) => {
    const {
      score,
      numberOfQuestions,
      numberOfAnsweredQuestions,
      correctAnswers,
      wrongAnswers,
      fiftyFiftyUsed,
      hintsUsed,
      matric,
    } = req.body;

    //Checking if matric entered exist on the User database
    User.findOne({ matric }).then((user) => {
      if (!user) {
        return res.status(400).json({
          message: {
            msgBody: "User with such Matric does not exist!!!!.",
            msgError: true,
          },
        });
      } else {
        // user exist then its proceeding to submit and save user
        const new_Statistics = new Quiz_Statistics({
          score,
          numberOfQuestions,
          numberOfAnsweredQuestions,
          correctAnswers,
          wrongAnswers,
          fiftyFiftyUsed,
          hintsUsed,
          matric,
        });
        new_Statistics
          .save()
          .then(() => {
            res.status(200).json({
              message: {
                msgBody: "Quiz statistics has been saved!!",
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

        //configuring mail
        const mailOptions = {
          from: 'no-reply@nimelssaQuiz.com',
          to: process.env.EMAIL,
          subject: "Quiz statistics",
          html: `
    <div>
     <h1>${matric} Quiz Statistics</h1>
      <p>Student's Matric = ${matric}</p>
      <p>Score = ${score}</p>
      <p>Number of questions =  ${numberOfQuestions}</p>
      <p>Number of answered Questions = ${numberOfAnsweredQuestions}</p>
      <p>Correct Answers =  ${correctAnswers}</p>
      <p>Wrong Answers = ${wrongAnswers}</p>
      <p>Fifty Fifty Used = ${fiftyFiftyUsed}</p>
      <p>Hints Used = ${hintsUsed}</p>
      <p>Date and time submitted = ${moment().format('LLLL')}</p>
  </div>
      `,
        };

        const transporter = nodemailer.createTransport({
          service: "gmail",
          secure: false,
          port: 587,
          auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
          },
        });

        transporter
          .sendMail(mailOptions)
          .then(() => {
            return res.status(200).json({
              message: {
                msgBody: "Email sent successfully",
                msgError: false,
              },
            });
          })
          .catch(() => {
           console.log("Oops Email not sent!!!");
          });
      }
    });
  }
);


userRouter.put('/forgot', (req, res) => {
  const { email } = req.body;

  User.findOne({ email }, (err, user) => {
      if (err || !user) {
          return res.status(400).json({
              message: {
                msgBody: "User with that email does not exist",
                msgError: true,
              },
          });
      }

      const token = JWT.sign({ _id: user._id }, process.env.SECRETEkEY, { expiresIn: '30m' });

      const mailOptions = {
        from: 'Nimelssa Quiz <no-reply@nimelssaQuiz.com>',
        to: email,
        subject: `User Reset Password`,
        html: `
        <div>
          <h1>Reset password</h1>
          <p>A password reset event has been triggered. The password reset window is limited to thirty minutes.</p>
          <p>If you do not reset your password within thirty minutes, you will need to submit a new request.</p>
          <p>To complete the password reset process, visit the following link:</p>
          <p>${process.env.CLIENT_URL}/reset/${token}</p>
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
                    msgBody: "Database connection error on user password forgot request",
                    msgError: true,
                  },
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



userRouter.put('/reset', (req, res)=>{
  const { resetPasswordLink, newPassword } = req.body;

  if (resetPasswordLink) {
      JWT.verify(resetPasswordLink, process.env.SECRETEkEY, function(err, decoded) {
          if (err) {
              return res.status(400).json({
                message: {
                  msgBody: "Oops Expired link. Try again" ,
                  msgError: true,
                }
              });
          }

          User.findOne({ resetPasswordLink }, (err, user) => {
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
                          msgBody: "Oops Error resetting user password" ,
                          msgError: true,
                        }
                      });
                  }
                  res.status(200).json({
                    message: {
                      msgBody: `Congratulations! proceed to login with your new password`,
                      msgError: false,
                    }
                  });
              });
          });
      });
  }
})

//Get logged in user
userRouter.get('/loggedIn', passport.authenticate("local-userJwt", {
  session: false,
}),async(req,res)=>{

  const user = await User.findById(req.user._id).select('-password');
  if(user){
    res.send(user)
  }else{
    res.send('No user is logged in');
  }
}) 

   userRouter.post('/oneUser', passport.authenticate("local-userJwt", {
    session: false,
  }), async(req, res) => {
   const { matric} = req.body;                                                                                                          
   const singleUser = await User.findOne({matric}).select('-password');
   if(!singleUser){
     return res.status(404).json(`User with  matric ${matric} does not exist`);
   }else{
      return res.status(200).json(_.pick(singleUser, ['username', 'matric', 'role']));
   }});     

module.exports = userRouter;


