import mongoose from 'mongoose';
const personalSchema = mongoose.Schema({
    pnr: { type: String, unique: true },
    status: { type: String, required: true },
    title: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    birthCountry: { type: String, required: true },
    birthDate: { type: Date, required: true },
    birthCity: { type: String, required: true },
    nationality: { type: String, required: true },
    occupation: { type: String, required: true },
    fatherName: { type: String, required: true },
    motherName: { type: String, required: true },
    married: { type: String, required: true },
});

const passportSchema = mongoose.Schema({
    passportNo: { type: String, unique: true },
    passportIssueDate: { type: Date, required: true },
    passportExpiryDate: { type: Date, required: true },
    passportAuthority: { type: String, required: true },
    passportIssueState: { type: String, required: true },
    travelType: { type: String, required: true },
    visaType: { type: String, required: true },
    documentType: { type: String, required: true },
    entryType: { type: String, required: true }
});

const contactSchema = mongoose.Schema({
    telNo: { type: Number, required: true },
    email: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    postalCode: { type: String, required: true }
});

const travelSchema = mongoose.Schema({
    tripStartDate: { type: Date, required: true },
    insuranceExpiryDate: { type: Date, required: true },
    airportName: { type: String, required: true },
    durationOfStay: { type: String, required: true },
    hotelName: { type: String },
    description: { type: String }
});

const servicesSchema = mongoose.Schema({
    service: [{
        sum: Number,
        service: String
    }]
});
const adminSchema = mongoose.Schema({
    admin: { type: mongoose.Types.ObjectId, required: true }
})
const barcodeSchema = mongoose.Schema({
    barcodeValue: { type: String, unique: true },
    personal: personalSchema,
    passport: passportSchema,
    contact: contactSchema,
    travel: travelSchema,
    services: servicesSchema,
    visaStatus: { type: String, required: true },
    result: { type: String, required: true },
    adminSchema,
    country: { type: String, required: true, enum: ["MALI", "SIERRA", "GANA", "GINE", "GAMBIA", "ALL"] }
}, { timestamps: true });


export default mongoose.model("barcodes", barcodeSchema);