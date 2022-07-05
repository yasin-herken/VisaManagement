import mongoose from 'mongoose';

const visaSchema = mongoose.Schema({
    _id: Number,
    name:String,
    ref:{
        name:String,
        index:[Number]
    }
});

export default mongoose.model("visadocuments",visaSchema);