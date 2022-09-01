import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import passport from 'passport';
import bcrypt from 'bcryptjs';
import UserModel from './dbUser.js';
import dbCollection from './dbCollection.js';
import Price from './dbPrices.js';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import dotenv from 'dotenv/config';
//app config
const app = express();
const port = process.env.PORT || 8001;

//middleware
app.set("trust proxy", 1);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", 'http://localhost:3000/');
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});

app.use(cors({
    credentials: false,
    origin: "*"
}));
app.use(passport.initialize());
import './passportConfig.js';

//DB config
//const connection_url = "mongodb+srv://admin:" + key +"@cluster0.mj82ul2.mongodb.net/users?retryWrites=true&w=majority";
const connection_url = "mongodb://user:" + process.env.MONGO_PASSWORD + "@194.195.241.214:27017/users"
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) {
        console.log("Error on mongodb connect")
        throw err;
    }
    console.log("Mongoose is connected");

})
//app routers
app.get("/", (req, res) => {
    res.status(200).send("Hello World");

});
app.post("/login",
    (req, res) => {
        UserModel.findOne({ username: req.body.username }).then(user => {
            //No user found
            if (!user) {
                console.log("!user")
                return res.status(401).send({
                    success: false,
                    message: "Could not find the user"
                })
            }

            if (!bcrypt.compareSync(req.body.password, user.password)) {
                return res.status(401).send({
                    success: false,
                    message: "Incorrect password"
                })
            }

            const payload = {
                username: user.username,
                id: user._id
            }
            const secretOrKey = 'jwt_secret_key'
            const token = jwt.sign(payload, secretOrKey, { expiresIn: "10s" })

            return res.status(200).send({
                success: true,
                message: "Logged in successfully",
                token: "Bearer " + token,
                username: user.username,
                role: user.role
            })
        })
    });
app.post("/register", (req, res) => {
    UserModel.findOne({
        username: req.body.username
    }, async (err, data) => {
        if (err) throw err;
        if (data) {
            res.send({
                success: false,
                message: "User is already exists"
            })
        }
        if (!data) {
            const user = new UserModel({
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, 10),
                role: "Client"
            });
            user.save().then(user => {
                res.send({
                    success: true,
                    message: "User created successfully",
                    user: {
                        id: user._id,
                        username: user.username,
                        role: user.role
                    }
                })
            }).catch(err => {
                res.send({
                    success: false,
                    message: "Something went wrong",
                    error: err
                })
            })
        }
    })

});
app.get("/getUser", (req, res) => {
    if (req.user !== "" || req.user !== null)
        res.json(req.user)
});
app.get("/admin", passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.status(200).send({
        success: true,
        user: {
            id: req.user._id,
            username: req.user.username,
            role: req.user.role
        }
    })
})
app.post("/logout", (req, res) => {
    req.logout((res) => {
    })
    const msg = {
        data: "Succesfully Logout",
        direct: "/login"
    }
    res.json(msg)
})
app.post("/postData", (req, res) => {
    if (req.isAuthenticated() && req.user.role === "Admin") {
        data.forEach((singleData) => {
            dbCollection.findOne({
                name: singleData.name
            }, async (err, data) => {
                if (!data) {
                    console.log(singleData)
                    const newData = new dbCollection(singleData);
                    await newData.save()
                }
            }).then(res => console.log(res)).catch(err => console.log(err))
        })
    }
})
app.put("/updateData", (req, res) => {
    if (req.isAuthenticated() && req.user.role === "admin") {
        dbCollection.updateMany({
            "visaTypes.name": 'IHB'
        }, { $set: { "visaTypes.$": { name: "IHB Saglik" } } }, (err, data) => {
            res.send(data)
            console.log(err)
        })
    } else {
        res.send("Acess Denied");
    }
})
app.get("/findbyName", (req, res) => {
    dbCollection.find({
        'visaTypes.name': 'IHB Saglik'
    }, (err, data) => res.send(data))
})
app.get("/getData", (req, res) => {
    dbCollection.find({}, (err, data) => {
        if (err) throw err;
        res.json(data)
    })
})
app.get("/getPrices", (req, res) => {

    Price.find({}, async (err, data) => res.json(data))
})
app.post("/postPrices", (req, res) => {

    if (req.isAuthenticated() && req.user.role === "admin") {
        Price.findOne({
            "service.name": data
        }, async (err, data) => {
            if (err) throw err;
            if (data) {
                res.send("Data is exist");
            } else {

                const data = new Price({
                    service: {
                        name: req.body.service.name,
                        price: req.body.service.price
                    }
                })
                await data.save()
                res.send("Data added database successfully")
            }
        })
    } else {
        res.send("Acess Denied")
    }

})
//listener
app.listen(port, () => console.log("Listening on " + port));
