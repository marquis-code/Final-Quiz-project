const morgan = require("morgan");
const helment = require("helmet");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require('express-session');
require("dotenv").config();

app.use(helment());

app.use(cookieParser());
app.use(session({
  secret: process.env.SECRETEkEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    /*   secure: true */ //This should only be set to true when we are using https 
  }
}))
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};
const dbString = process.env.MONGODB_URL;

mongoose
  .connect(dbString, dbOptions)
  .then(() => {
    console.log("Sucessfully connected to MongoDb Database");
  })
  .catch((err) => {
    console.error("Couldnt Connect To MongoDb Database");
  });

const userRouter = require("./router/User");
const quizRouter = require("./router/Quiz");
const adminRouter = require("./router/Admin");
const passport = require("passport");

app.use(morgan("dev"));

app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use("/quiz", quizRouter);

//404 Error Handler
app.use((req, res, next) => {
 res.status(404).json({
  error: {
    message: "Sorry we could not find that page",
  }
 })
});



//Handle all other errors in the application e.g Database error
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
      status: error.status || 500,
    },
  });
});

//Handle forbidden requests
app.use((error, req, res, next) => {
 if(error.status === 403){
  res.json({
    error: {
      message: 'Access Denied'
    },
  });
 }
});

//handle unauthorized request
app.use((error, req, res, next) => {
  if(error.status === 401){
   res.json({
     error: {
       message: 'You are not authorized to access this resource'
     },
   });
  }
 });

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Express Server is Listening on port ${port}...`);
});
