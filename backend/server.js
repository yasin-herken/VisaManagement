import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import UserModel from './dbUser.js';
import dbCollection from './dbCollection.js';
import dbSingleMultiple from "./dbSingleMultiple.js";
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
import LabelforCountry from "./enum/countryLabel.js";
import {
    verifyTokenAndAdmin,
} from "./verifyToken.js";

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
// const connection_url = "mongodb+srv://admin:" + process.env.MONGO_ATLAS_PASSWORD + "@cluster0.mj82ul2.mongodb.net/users?retryWrites=true&w=majority";
const connection_url = "mongodb+srv://donmezogluBilisim:" + process.env.MONGO_ATLAS_PASSWORD + "@visamanagement.1wkhjad.mongodb.net/users?retryWrites=true&w=majority"
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
                country: user.country,
                admin: user.admin
            }
            const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "24h" })
            return res.status(200).send({
                success: true,
                message: "Logged in successfully",
                token: "Bearer " + token,
                username: user.username,
                role: user.role,
                country: user.country,
                id: user._id,
                admin: user.admin
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
                role: Role.Admin,
                country: Country.MALI,
                admin: false,
            });
            user.save().then(user => {
                res.send({
                    success: true,
                    message: "User created successfully",
                    user: {
                        id: user._id,
                        username: user.username,
                        role: user.role,
                        country: user.country,
                        admin: user.admin,
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
    let query = {
        country: req.query.country
    }
    if (req.query?.pnrNo) {
        query = {
            country: req.query.country,
            "personal.pnr": req.query.pnrNo
        }
    } else if (req.query?.passportNo) {
        query = {
            country: req.query.country,
            "passport.passportNo": { $in: req.query.passportNo }
        }
    }
    dbBarcode.find(req.query.country === "ALL" ? {} : query, (err, data) => {
        if (err) throw err
        res.send(data)
    })
});

app.post("/barcode", verifyTokenAndAdmin, (req, res) => {
    dbBarcode.findOne({
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
                        tempBarcode = LabelforCountry[req.body.country] + "-" + tempBarcode;
                        barcodeNumber = tempBarcode

                    }
                    if (!data) {
                        barcodeNumber = LabelforCountry[req.body.country] + "-000000";
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
                            entryType: req.body.passport.entryType,
                            passportIssueDate: req.body.passport.passportIssueDate,
                            passportExpiryDate: req.body.passport.passportExpiryDate,
                            passportAuthority: req.body.passport.passportAuthority,
                            passportIssueState: req.body.passport.passportIssueState,

                        },
                        personal: {
                            status: req.body.personal.status,
                            pnr: barcodeNumber,
                            name: req.body.personal.name,
                            surname: req.body.personal.surname,
                            title: req.body.personal.title,
                            birthDate: req.body.personal.birthDate,
                            birthCountry: req.body.personal.birthCountry,
                            birthCity: req.body.personal.birthCity,
                            nationality: req.body.personal.nationality,
                            occupation: req.body.personal.occupation,
                            fatherName: req.body.personal.fatherName,
                            motherName: req.body.personal.motherName,
                            married: req.body.personal.married,
                        },
                        travel: {
                            tripStartDate: req.body.travel.tripStartDate,
                            insuranceExpiryDate: req.body.travel.insuranceExpiryDate,
                            airportName: req.body.travel.airportName,
                            durationOfStay: req.body.travel.durationOfStay,
                            hotelName: req.body.travel.hotelName,
                            description: req.body.travel.description
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

app.put("/barcode", verifyTokenAndAdmin, (req, res) => {
    const id = req.body.items.map((item) => {
        return mongoose.Types.ObjectId(item._id);
    })

    let set;
    if (req.body.selectedVisaStatus === "") {
        set = {
            result: req.body.selectedpassportStatus
        }
    } else if (req.body.selectedpassportStatus === "") {
        set = {
            visaStatus: req.body.selectedVisaStatus
        }
    } else {
        set = {
            result: req.body.selectedpassportStatus,
            visaStatus: req.body.selectedVisaStatus
        }
    }
    try {
        dbBarcode.updateMany({ _id: { $in: id } }, { $set: set }, { multi: true })
        res.json({
            message: "Successfully updated",
            success: true
        })
    } catch (err) {
        res.json({
            message: "Failure update table",
            success: false
        })
    }

})

app.put("/barcodeUpdate", verifyTokenAndAdmin, (req, res) => {
    try {
        dbBarcode.updateMany({ _id: req.body._id }, {
            $set: {
                personal: {
                    pnr: req.body.personal.pnr,
                    status: req.body.personal.status,
                    title: req.body.personal.title,
                    name: req.body.personal.name,
                    surname: req.body.personal.surname,
                    birthCountry: req.body.personal.birthCountry,
                    birthDate: req.body.personal.birthDate,
                    birthCity: req.body.personal.birthCity,
                    nationality: req.body.personal.nationality,
                    occupation: req.body.personal.occupation,
                    fatherName: req.body.personal.fatherName,
                    motherName: req.body.personal.motherName,
                    married: req.body.personal.married,
                },
                passport: {
                    passportNo: req.body.passport.passportNo,
                    passportIssueDate: req.body.passport.passportIssueDate,
                    passportExpiryDate: req.body.passport.passportExpiryDate,
                    passportAuthority: req.body.passport.passportAuthority,
                    passportIssueState: req.body.passport.passportIssueState,
                    travelType: req.body.passport.travelType,
                    visaType: req.body.passport.visaType,
                    documentType: req.body.passport.documentType,
                    entryType: req.body.passport.entryType
                },
                contact: {
                    telNo: req.body.contact.telNo,
                    email: req.body.contact.email,
                    country: req.body.contact.country,
                    city: req.body.contact.city,
                    address: req.body.contact.address,
                    postalCode: req.body.contact.postalCode
                },
                travel: {
                    tripStartDate: req.body.travel.tripStartDate,
                    insuranceExpiryDate: req.body.travel.insuranceExpiryDate,
                    airportName: req.body.travel.airportName,
                    durationOfStay: req.body.travel.durationOfStay,
                    hotelName: req.body.travel.hotelName,
                    description: req.body.travel.description
                },
                services: {
                    service: req.body.services.service
                },
            }
        })
        res.json({
            message: "Succesfully updated",
            success: true
        })
    } catch (err) {
        res.json({
            message: "Something went wrong",
            success: false
        })
    }

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
    Price.findOne({
        "country.name": req.query.country
    }, async (err, data) => {
        res.status(200).json(data?.country?.service ? data.country.service : [])
    })
})
app.post("/postPrices", (req, res) => {
    if (1) {
        Price.findOne({
            "country.name": req.body.country.name
        }, async (err, data) => {
            if (err) throw err;
            if (data) {
                res.send("Data is exist");
            } else {
                const data = new Price({
                    country: {
                        name: req.body.country.name,
                        service: {
                            name: req.body.service.name,
                            price: req.body.service.price
                        }
                    }
                })
                await data.save()
                res.send("Data added database successfully")
            }
        })
    } else {
        res.send("Acess Denied")
    }
    res.send("Ok")
});
app.delete("/barcode", verifyTokenAndAdmin, (req, res) => {
    if (req.body.admin) {
        try {
            dbBarcode.deleteOne({ _id: mongoose.Types.ObjectId(req.body.id) }).then(
                (response => {
                    if (response?.deletedCount >= 1) {
                        res.send({
                            success: true,
                            message: "Succesfully Deleted"
                        })
                    } else if (response?.deletedCount < 1) {
                        res.send({
                            success: false,
                            message: "The document can't delete"
                        })
                    }
                })
            )
        } catch (err) {
            res.send({
                success: false,
                message: "Something went wrong"
            })
        }

    } else {
        res.send({
            success: false,
            message: "You are not alowed to do that"
        })
    }
})

app.get("/singlemultiples", (req, res) => {
    dbSingleMultiple.findOne({ country: req.query.country }, (err, data) => {
        if (err) throw err;
        res.send(data?.prices ? data.prices : {
            single: 0,
            multiple: 0
        });
    })
})