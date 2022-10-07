import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import UserModel from './dbUser.js';
import dbCollection from './dbCollection.js';
import Price from './dbPrices.js';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import dotenv from 'dotenv/config';
import dbBarcode from "./dbBarcode.js";
import fs from 'fs';
import path from "path";
import * as url from 'url';
import https from "https";
import Role from "./enum/user.js";
import Country from "./enum/country.js";
import {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} from "./verifyToken.js";
import { resolveSoa } from 'dns';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
//app config
const app = express();
const port = process.env.PORT || 8001;
//middleware
app.use('/static', express.static(path.join(__dirname, 'public')))
if (process.platform === "linux") {
    https
        .createServer(
            {
                key: fs.readFileSync('/etc/letsencrypt/live/stvisaglobal.com/privkey.pem'),
                cert: fs.readFileSync('/etc/letsencrypt/live/stvisaglobal.com/cert.pem'),
                ca: fs.readFileSync('/etc/letsencrypt/live/stvisaglobal.com/chain.pem'),
            },
            app
        )
        .listen(port, () => {
            console.log('Listening...')
        })
}
else {
    //listener
    app.listen(port, () => console.log("Listening on " + port));
}
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
app.use(express.json());

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
app.post("/login",
    (req, res) => {
        UserModel.findOne({ username: req.body.username }).then(user => {
            //No user found
            if (!user) {
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
                id: user._id,
                role: user.role,
                country: user.country
            }
            const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "24h" })
            return res.status(200).send({
                success: true,
                message: "Logged in successfully",
                token: "Bearer " + token,
                username: user.username,
                role: user.role,
                country: user.country,
                id: user._id
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
                role: Role.Client,
                country: Country.MALI
            });
            user.save().then(user => {
                res.send({
                    success: true,
                    message: "User created successfully",
                    user: {
                        id: user._id,
                        username: user.username,
                        role: user.role,
                        country: user.country
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
app.get("/barcode", verifyTokenAndAdmin, (req, res) => {
    dbBarcode.find(req.query.country === "ALL" ? {} : { country: req.query.country }, (err, data) => {
        console.log(data);
        res.send(data)
    })
})
app.post("/barcode", verifyTokenAndAdmin, (req, res) => {
    dbBarcode.findOne({
        pnr: req.body.personal.pnr,
        passport: {
            passportNo: req.body.passport.passportNo
        },
        country: req.body.country
    }
        , async (err, data) => {
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
                dbBarcode.findOne({ country: req.body.country }, { barcodeValue: 1 }, (err, data) => {
                    if (err) res.status(403).json(err);
                    if (data) {
                        let tempBarcode = data.barcodeValue.slice(-6);
                        tempBarcode = parseInt(tempBarcode) + 1;
                        tempBarcode = String(tempBarcode).padStart(6, '0');
                        tempBarcode = req.body.country + "-" + tempBarcode;
                        barcodeNumber = tempBarcode

                    }
                    if (!data) {
                        barcodeNumber = req.body.country + "-000000";
                    }
                    const barcode = new dbBarcode({
                        contact: {
                            telNo: req.body.contact.telNo,
                            email: req.body.contact.email,
                            country: req.body.contact.country,
                            city: req.body.contact.city,
                            address: req.body.contact.address,
                            postalCode: req.body.contact.postalCode
                        },
                        passport: {
                            passportNo: req.body.passport.passportNo,
                            travelType: req.body.passport.travelType,
                            visaType: req.body.passport.visaType,
                            documentType: req.body.passport.documentType,
                            entryType: req.body.passport.entryType?.label,
                            passportIssueDate: req.body.passport.passportIssueDate,
                            passportExpiryDate: req.body.passport.passportExpiryDate,
                            passportAuthority: req.body.passport.passportAuthority,
                            passportIssueState: req.body.passport.passportIssueState,

                        },
                        personal: {
                            status: req.body.personal.status.label,
                            pnr: req.body.personal.pnr,
                            name: req.body.personal.name,
                            surname: req.body.personal.surname,
                            title: req.body.personal.title?.label,
                            birthDate: req.body.personal.birthDate,
                            birthCountry: req.body.personal.birthCountry,
                            birthCity: req.body.personal.birthCity,
                            nationality: req.body.personal.nationality,
                            occupation: req.body.personal.occupation,
                            fatherName: req.body.personal.fatherName,
                            motherName: req.body.personal.motherName,
                            married: req.body.personal.married.label,
                        },
                        services: {
                            service: req.body.services.service
                        },
                        barcodeValue: barcodeNumber,
                        visaStatus: "In Mission",
                        result: "Waiting",
                        country: req.body.country,
                        admin: req.body.admin
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
        res.status(200).json(req.user)
});
app.get("/admin", verifyTokenAndAdmin, (req, res) => {
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
app.post("/postData", verifyTokenAndAdmin, (req, res) => {
    data.forEach((singleData) => {
        dbCollection.findOne({
            name: singleData.name
        }, async (err, data) => {
            if (!data) {
                const newData = new dbCollection(singleData);
                await newData.save()
            }
        }).then(res => console.log(res)).catch(err => console.log(err))
    })

})
app.put("/updateData", verifyTokenAndAdmin, (req, res) => {
    dbCollection.updateMany({
        "visaTypes.name": 'IHB'
    }, { $set: { "visaTypes.$": { name: "IHB Saglik" } } }, (err, data) => {
        res.send(data)
    })

})
app.get("/findbyName", (req, res) => {
    dbCollection.find({
        'visaTypes.name': 'IHB Saglik'
    }, (err, data) => res.send(data))
})
app.get("/getData", (req, res) => {
    dbCollection.find({}, (err, data) => {
        if (err) throw err;
        res.status(200).json(data)
    })
})
app.get("/getPrices", (req, res) => {
    Price.find({}, async (err, data) => {
        res.status(200).json(data)
    })
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
        if (err) throw err;
        if (data) {
            res.status(200).send({
                success: true,
                message: "Barcode successfully deleted"
            })
        }
        if (!data) {
            res.status(404).send({
                success: false,
                message: "Barcode failed deleted"
            })
        }
    })
    res.send
})

