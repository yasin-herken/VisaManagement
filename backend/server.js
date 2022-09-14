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
import dbBarcode from "./dbBarcode.js";
//app config
const app = express();
const port = process.env.PORT || 8001;
//middleware
app.set("trust proxy", 1);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", '*');
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
const connection_url = "mongodb+srv://admin:" + process.env.MONGO_ATLAS_PASSWORD + "@cluster0.mj82ul2.mongodb.net/users?retryWrites=true&w=majority";
// const connection_url = "mongodb://user:" + process.env.MONGO_PASSWORD + "@194.195.241.214:27017/users"
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
<<<<<<< HEAD
    console.log("asd")
=======

>>>>>>> ac200e277a82dbf4a17df516cdaa30fecd1b38f3
    res.send("Hello")
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
    console.log("here")
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
                role: "Admin"
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
app.get("/barcode", (req, res) => {
    dbBarcode.find({}, (err, data) => {
        res.send(data)
    })
})
app.post("/barcode", (req, res) => {
    dbBarcode.findOne({ barcodeValue: req.body.barcodeValue, passportNo: req.body.passportNo }, async (err, data) => {
        if (err) throw err;
        var barcodeNumber = null;
        if (data) {
            if (data.barcodeValue === req.body.barcodeValue) {
                res.status(200).send({
                    success: false,
                    message: "Barcode Value must be unique."
                })
            } else if (data.passportNo === req.body.passportNo) {
                res.status(200).send({
                    success: false,
                    message: "PassportNo must be unique."
                })
            }
        }
        if (!data) {

            dbBarcode.findOne({}, { barcodeValue: 1 }, (err, data) => {
                if (err) throw err;
                if (data) {
                    let tempBarcode = data.barcodeValue.slice(-6);
                    tempBarcode = parseInt(tempBarcode) + 1;
                    tempBarcode = String(tempBarcode).padStart(6, '0');
                    tempBarcode = "MALI-" + tempBarcode;
                    barcodeNumber = tempBarcode

                }
                if (!data) {
                    barcodeNumber = "MALI-000000";
                }
                const barcode = new dbBarcode({
                    name: req.body.name,
                    surname: req.body.surname,
                    telNo: parseInt(req.body.telNo),
                    passportNo: req.body.passportNo,
                    travelType: req.body.travelType,
                    visaType: req.body.visaType,
                    documentType: req.body.documentType,
                    entryType: req.body.entryType,
                    status: req.body.status,
                    barcodeValue: barcodeNumber,
                    visaStatus: "In Mission",
                    result: "Waiting"
                });
                barcode.save().then(() => {
                    res.send({
                        success: true,
                        message: "Document created successfully",
                    })
                }).catch((err) => {
                    res.send({
                        success: false,
                        message: "Something went wrong.",
                        error: err
                    })
                }

                )
            }).sort({ barcodeValue: -1 });

        }
    })
})
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

});
app.delete("/barcode", (req, res) => {
    dbBarcode.deleteOne({ identification: req.body.identification }, (err, data) => {
        console.log(err, data);
        if (err) throw err;
        if (data) {
            res.status(200).send({
                success: true,
                message: "Barcode successfully deleted"
            })
        }
        if (!data) {
            console.log("bere")
            res.status(404).send({
                success: false,
                message: "Barcode failed deleted"
            })
        }
    })
    res.send
})
//listener
app.listen(port, () => console.log("Listening on " + port));
