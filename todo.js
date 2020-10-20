//button sound effect
//get all the currently loged in user via the admin
//Prevent users from logging in twice to prevent them from playing the quiz again

const session = require('express-session') // in server.js

// require this below the cookie parser middleware
app.use(session({
    secret: "NimelssaOnly",
    resave: false,
    saveUninitialized: false,
    cookie: {
      /*   secure: true */ //This should only be set to true when we are using https 
    }
}))