const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const User = require('./models/User');

const cookieExtractor = req =>{
    let token = null;
    if(req && req.cookies){
        token = req.cookies["access_token"];
    }
    return token;
}

// authorization 
passport.use(new JwtStrategy({
    jwtFromRequest : cookieExtractor,
    secretOrKey : "NimelssaOnly"
},(payload,done)=>{
    User.findById({_id : payload.sub},(err,user)=>{
        if(err)
            return done(err,false);
        if(user)
            return done(null,user, {msgBody : "User Found In DB in passport", msgError: false});
        else
            return done(null,false, {msgBody : "User Not Found In DB", msgError: true});
    });
}));

// authenticated local strategy using username and password
passport.use(new LocalStrategy(
    { 
        usernameField:'matric',
        passwordField: 'password',
        session: false,
        passReqToCallback: true
    },
    (req,matric,password,done) => {
    User.findOne({matric},(err,user)=>{
        // something went wrong with database
        if(err)
            return done(err);
        // if no user exist
        if(!user)
            return done(null,false, {msgBody : "Matric Number Not Registered", msgError: true});
        // check if password is correct
        user.comparePassword(password,done);
        
    });
}));

