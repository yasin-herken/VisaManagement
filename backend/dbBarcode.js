import mongoose from 'mongoose';
const barcodeSchema = mongoose.Schema({
    identification: {
        type: String, 
        unique: true
    },
    username: String,
    lastname: String,
    dateOfBirthday: Date,
    status: String,
    placeOfBirthday: String,
    gender: String,
    barcodeValue: String,
},{ timestamps : true});

export default mongoose.model("barcodes",barcodeSchema);