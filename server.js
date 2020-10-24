require('express-async-errors');
const morgan = require("morgan");
const helment = require("helmet");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

app.use(helment());

app.use(cookieParser());
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


app.use(morgan("dev"));
app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use("/quiz", quizRouter);


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Express Server is Listening on port ${port}...`);
});



