require('express-async-errors');
const morgan = require("morgan");
const helment = require("helmet");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const path = require('path');

app.use(helment());

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors(corsOptions));

const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

 mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/Online-Quiz", dbOptions)
  .then(() => {
    console.log("Sucessfully connected to MongoDb Database");
  })
  .catch((err) => {
    console.error("Couldnt Connect To MongoDb Database");
  }); 


const userRouter = require("./router/User"); //check
const quizRouter = require("./router/Quiz");
const adminRouter = require("./router/Admin"); //check

app.use(morgan("tiny"));
app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use("/quiz", quizRouter);


if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build/'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Express Server is Listening on port ${PORT}`);
});




