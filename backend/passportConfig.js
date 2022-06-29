import User from './dbUser.js';
import bcrypt from 'bcryptjs';
import localStrategy from 'passport-local';
localStrategy.Strategy;

export default function(passport){
    console.log("Girdi4")
    passport.use(
        new localStrategy((username,password,done)=>{
            console.log("Girdi5")
            User.findOne({username: username},(err,user)=>{
                if(err) {return done(err);}
                if(!user) return done(null,false,{ message: 'Incorrect username or password.' });
                bcrypt.compare(password,user.password,(err,result)=>{
                    if(err) throw err;
                    if(result===true){
                        return done(null,user);
                    }else{
                        return done(null,false);
                    }
                });

            });

        })
    );
    passport.serializeUser((user,cb)=>{
        cb(null,user.id);
    });
    passport.deserializeUser((id,cb)=>{
        User.findOne({_id:id},(err,user)=>{
            const userInformation ={
                username: user.username,
                email: user.email,
                role: user.role
            };
            cb(err,userInformation);
        });
        
    });
};