import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import passport from 'passport';
import passportLocal from 'passport-local';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import session from "express-session";
import bodyParser from 'body-parser';
import key from './config.js';
import User from './dbUser.js';
import passportConfig from './passportConfig.js';
//app config
const app = express();
const port = process.env.PORT || 8000;

//middleware
app.set("trust proxy", 1);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","*");
    res.setHeader("Access-Control-Allow-Credentials","true");
    next();
});
app.use(cors({
    origin: "http://localhost:3000", // <--- location of the react app were connecting to
    credential: true
}));
app.use(session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);
app.use(function(err, req, res, next) {
    console.log(err);
});

//DB config
const connection_url = "mongodb+srv://admin:" + key +"@cluster0.mj82ul2.mongodb.net/users?retryWrites=true&w=majority";
mongoose.connect(connection_url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
},()=>{
    console.log("Mongoose is connected");
});
//app routers
app.get("/",(req,res)=>{
    res.status(200).send("Hello World");
});
app.post("/login",(req,res,next)=>{
    const msg ={
        message: "",
        direct: ""
    };
    passport.authenticate("local",{ failureRedirect: '/getUser', failureMessage: true },(err,user,info)=>{
        if(err) throw err;
        if(!user) {
            msg.message= "Password is wrong";
            msg.direct="/login";
            res.json(msg)
        }
        else{
            req.logIn(user,err=>{
                if(err) throw err;
                msg.message="";
                msg.direct="/admin";
                res.json(msg);
            })
        }
    })(req,res,next);
});
app.post("/register",(req,res)=>{
    const msg = {
        message: "",
        direct: ""
    }
    User.findOne({
        username:req.body.username
    },async (err,data)=>{
        if(err) throw err;
        if(data){
            
        msg.message="User is already exists";
        msg.direct="/register";
        
        res.json(msg)
    };
        if(!data){
            const saltRounds = 10;
            const salt1 = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(req.body.password, salt1);
            const newUser = new User({
                name: req.body.name,
                surname: req.body.surname,
                username: req.body.username,
                password: hashedPassword,
                email: req.body.email,
                role: req.body.role,
            });
            await newUser.save();
            const msg ={
                message: "User Created",
                direct: "/admin"
            }
            res.json(msg);
        }
    })
});
app.get("/getUser",(req,res)=>{
    res.json(req.user)
});
app.get("/admin",(req,res) => {
    console.log(req.user)
    if (req.user.role!=="Admin" || req.user==="")
        res.status(403).send("Restricted area");
    else{
        const msg ={
            data: req.user,
            direct: "/admin"
        }
        res.json(msg);
    }
    
})
app.post("/newApplication",(req,res)=>{
    const msg ={
        data: req.user,
        direct: "/admin"
    }
    res.json(msg);
})
app.post("/logout",(req,res)=>{
    req.logout((res)=>{
        console.log(res)
    })
    const msg ={
        data: "Succesfully Logout",
        direct: "/login"
    }
    console.log("HEre")
    res.json(msg)
})
app.post("/visa",(req,res) =>{
    
})
//listener
app.listen(port,()=>console.log("Listening on "+port));