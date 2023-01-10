import mongoose from 'mongoose';
const documentSchema = mongoose.Schema({
    name:String,
})
const visaSchema = mongoose.Schema({
    name:String,
    documentTypes:
    [documentSchema]
})
const travelSchema = mongoose.Schema({
    name:String,
    visaTypes:
    [visaSchema]
})
const dbSchema = mongoose.Schema(
    [travelSchema]
);

export default mongoose.model("single",dbSchema);