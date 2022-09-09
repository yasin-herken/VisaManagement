import mongoose from 'mongoose';
const barcodeSchema = mongoose.Schema({
    barcodeValue: {type:String, unique: true},
    name: String,
    surname: String,
    telNo: Number,
    passportNo:  {type:String, unique: true},
    travelType: String,
    visaType: String,
    documentType: String,
    entryType: String,
    status: String,
    visaStatus: String,
    result: String
},{ timestamps : true});

export default mongoose.model("barcodes",barcodeSchema);