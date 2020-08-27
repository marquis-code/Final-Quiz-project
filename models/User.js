const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); 

let UserSchema = new mongoose.Schema ({
    username:{ 
        type: String, 
        required: true
    },
    matric:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        maxlength:250
    },
    role:{
        type:String,
        enum:['user','admin'],
        required:true
    }
});

 UserSchema.pre('save',function(next){
 if(!this.isModified('password'))
     return next();
     bcrypt.hash(this.password,10,(error,passwordHash)=>{
         if(error)
            return next(error);
         this.password = passwordHash; 
         next(); 
     });
 });

 UserSchema.methods.comparePassword = function(password,callback){
     bcrypt.compare(password,this.password,(error,isMatch)=>{
        if(error)
           return callback(error);
        else{
            if(!isMatch)
               return callback(null,isMatch, { message: 'Password incorrect' });
            return callback(null,this);
        }
     })
 }
const User = mongoose.model('User',UserSchema);

module.exports = User;

