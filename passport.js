const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const User = require('./models/User');
const Admin = require('./models/Admin');
require('dotenv').config();

const cookieExtractor = (req) =>{ 
    let token = null;
    if(req && req.cookies){
        token = req.cookies["access_token"];
    }
    return token;
}

// authorization of User  
 const jwtAuthSettings = {
    jwtFromRequest : cookieExtractor, 
    secretOrKey : process.env.SECRETEKEY
  }
  
  const jwtVerifyCallback = (payload,done)=>{
       User.findById({_id : payload.sub})
       .then((user)=>{
          if(!user)
             return done(null, false);
             done(null,user);
       })
       .catch((err)=>{
           done(err);
       });
  }

  
const secondStrategy = new JwtStrategy(jwtAuthSettings, jwtVerifyCallback);

passport.use("local-userJwt",secondStrategy)


// authenticating user against a database using matric and password

const customInputs = {
    usernameField : "matric",
    passwordField : "password",
    session: false,
    passReqToCallback: true
}


const verifyCallback = (req, matric, password, done) =>{
     User.findOne({matric})
      .then((user)=>{
               // if no user exist
          if(!user)
              return done(null, false, {msgBody : "Invalid Matric or Password.", msgError: true});
               //if user exist then check if password is correct 
              user.comparePassword(password, done);
      })
      .catch((err)=>{
          done(err);
      });
}


const firstStrategy = new LocalStrategy(customInputs, verifyCallback);

passport.use("local-user", firstStrategy);



///////////////////////////////////////ADMIN////////////////////////

const adminCookieExtractor = (req) =>{ 
    let token = null;
    if(req && req.cookies){
        token = req.cookies["access_token"];
    }
    return token;
}

// authorization of Admin  
 const adminJwtAuthSettings = {
    jwtFromRequest : adminCookieExtractor, 
    secretOrKey : process.env.SECRETEKEY
  }
  
  const adminJwtVerifyCallback = (payload,done)=>{
       Admin.findById({_id : payload.sub})
       .then((user)=>{
          if(!user)
             return done(null, false);
             done(null,user);
       })
       .catch((err)=>{
           done(err);
       });
  }

  
const adminSecondStrategy = new JwtStrategy(adminJwtAuthSettings, adminJwtVerifyCallback);

passport.use("local-adminJwt",adminSecondStrategy)

// authenticating admin against a database using matric and password

const adminCustomInputs = {
    usernameField : "matric",
    passwordField : "password",
    session: false,
    passReqToCallback: true
}


const adminVerifyCallback = (req, matric, password, done) =>{
     Admin.findOne({matric})
      .then((user)=>{
               // if no user exist
          if(!user)
              return done(null, false, {msgBody : "Matric Number Not Registered", msgError: true});
               //if user exist then check if password is correct
              user.comparePassword(password, done);
      })
      .catch((err)=>{
          done(err);
      });
}


const adminFirstStrategy = new LocalStrategy(adminCustomInputs, adminVerifyCallback);

passport.use("local-admin", adminFirstStrategy);
