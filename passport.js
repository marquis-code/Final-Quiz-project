const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const User = require('./models/User');
const Admin = require('./models/Admin');
require('dotenv').config();

///////////////////////////////////////////////// USER JWT STRATEGY SETTINGS ///////////////////////////////////////////////////
 const cookieExtractor = req =>{ 
    let token = null;
    if(req && req.cookies){
        token = req.cookies["access_token"];
    }
    return token;
}
  
 const userJwtAuthSettings = {
    jwtFromRequest : cookieExtractor, 
    secretOrKey : "NimelssaOnly"
  }
  
  const userJwtVerifyCallback = (payload,done)=>{
       User.findById({_id : payload.sub})
       .then((user)=>{
          if(!user)
             return done(null, false);
             done(null,user);
       })
       .catch((err)=>{
           done(err, false);
       }); 
  }
  
const userSecondStrategy = new JwtStrategy(userJwtAuthSettings, userJwtVerifyCallback);

passport.use("local-userJwt",userSecondStrategy)

///////////////////////////////////////////////  USER LOCAL STRATEGY SETTINGS ///////////////////////////////////////

const userCustomInputs = {
    usernameField : "matric",
    passwordField : "password",
    session: false,
    passReqToCallback: true
}


const userVerifyCallback = (req, matric, password, done) =>{
     User.findOne({matric})
      .then((user)=>{
          if(!user)
              return done(null, false, {msgBody : "Invalid Matric or Password.", msgError: true});
              user.comparePassword(password, done);
      })
      .catch((err)=>{
          done(err);
      });
}

const userFirstStrategy = new LocalStrategy(userCustomInputs, userVerifyCallback);

passport.use("local-user", userFirstStrategy);



///////////////////////////////////////////////// ADMIN JWT STRATEGY SETTINGS ///////////////////////////////////////////////////

const adminCookieExtractor = (req) =>{ 
    let token = null;
    if(req && req.cookies){
        token = req.cookies["access_token"];
    }
    return token;
}

 const adminJwtAuthSettings = {
    jwtFromRequest : adminCookieExtractor, 
    secretOrKey : "NimelssaOnly"
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
 

///////////////////////////////////////////////  ADMIN LOCAL STRATEGY SETTINGS ///////////////////////////////////////

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
