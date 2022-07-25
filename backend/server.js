import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import session from "express-session";
import bodyParser from 'body-parser';
import key from './config.js';
import User from './dbUser.js';
import dbCollection from './dbCollection.js';
import passportConfig from './passportConfig.js';
import Price from './dbPrices.js';
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
    origin: ["http://localhost:3001","http://194.195.241.214:3001",], // <--- location of the react app were connecting to
    
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
        username:"",
        password:"",
        role: "Client",
        direct: "/"
    };
    passport.authenticate("local",{ failureRedirect: '/getUser', failureMessage: true },(err,user,info)=>{
        if(err) throw err;
        if(!user) {
            msg.role= "Restricted";
            msg.direct="/login";
            res.json(msg)
        }
        else{
            req.logIn(user,err=>{
                if(err) throw err;
                msg.role= user.role;
                if(user.role==="Admin"){
                    msg.username = user.username,
                    msg.password = user.password,
                    msg.role = user.role,
                    msg.direct = "/admin"
                }
                res.json(msg);
            })
        }
    })(req,res,next);
});
app.post("/register",(req,res)=>{
    const msg = {
        msg: "",
        direct: ""
    }
    User.findOne({
        username:req.body.username
    },async (err,data)=>{
        if(err) throw err;
        if(data){
            
        msg.msg="User is already exists";
        msg.direct="/register";
        
        res.json(msg)
    };
        if(!data){
            const saltRounds = 10;
            const salt1 = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(req.body.password, salt1);
            const newUser = new User({
                username: req.body.username,
                password: hashedPassword,
                email: req.body.email,
                role: "Client",
            });
            await newUser.save();
            const msg ={
                message: "User Created",
                direct: "/"
            }
            newUser.role ==="Admin" ? msg.direct="/admin": msg.direct ="/"
            res.json(msg);
        }
    })
});
app.get("/getUser",(req,res)=>{
    if(req.user!=="" || req.user!==null)
        res.json(req.user)
});
app.get("/admin",(req,res)=>{
    if(req.isAuthenticated() && req.user.role==="Admin")
    {
        res.json(req.user)
    }
})
app.post("/logout",(req,res)=>{
    req.logout((res)=>{
    })
    const msg ={
        data: "Succesfully Logout",
        direct: "/login"
    }
    res.json(msg)
})
app.post("/postData",(req,res)=>{
    if(req.isAuthenticated() && req.user.role==="Admin")
    {
        data.forEach((singleData)=>{
            dbCollection.findOne({
                name:singleData.name
            },async (err,data)=>{
                if(!data){
                    console.log(singleData)
                    const newData = new dbCollection(singleData);
                    await newData.save()
                }
            }).then(res=>console.log(res)).catch(err=>console.log(err))
        })
    }
})
app.put("/updateData",(req,res)=>{
    if(req.isAuthenticated() && req.user.role==="admin")
    {
        dbCollection.updateMany({
            "visaTypes.name":'IHB'
        },{$set:{"visaTypes.$":{name:"IHB Saglik"}}},(err,data)=>{res.send(data)
        console.log(err)})
        }else{
            res.send("Acess Denied");
        }
})
app.get("/findbyName",(req,res)=>{
    dbCollection.find({
       'visaTypes.name':'IHB Saglik'
    },(err,data)=>res.send(data))
})
app.get("/getData",(req,res)=>{
    dbCollection.find({},(err,data)=>res.json(data))
})
app.get("/getPrices",(req,res)=>{
    
        Price.find({},async (err,data)=>res.json(data))
})
app.post("/postPrices",(req,res)=>{
    if(req.isAuthenticated() && req.user.role==="admin")
    {
        Price.findOne({
            "service.name":req.body.service.name
        },async(err,data)=>{
            if(err) throw err;
            if(data){
                res.send("Data is exist");
            }else{
                
                const data = new Price({
                    service:{
                        name:req.body.service.name,
                        price:req.body.service.price
                    }
                })
                await data.save()
                res.send("Data added database successfully")
            }
        })
    }else{
        res.send("Acess Denied")
    }
    
})
//listener
app.listen(port,()=>console.log("Listening on "+ port));