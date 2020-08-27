const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
app.use(cookieParser());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/Online-Quiz',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false, 
    useCreateIndex: true
},()=>{
    console.log('successfully connected to database');
});

const userRouter = require('./router/User');
const quizRouter = require('./router/Quiz');

const User = require('./models/User');
const Quiz = require('./models/Quiz');

app.use("/user", userRouter);
app.use("/quiz", quizRouter);

app.listen(5000,()=>{
    console.log('express server started');
});