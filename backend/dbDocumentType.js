import mongoose from 'mongoose';

const documentSchema = mongoose.Schema({
    _id: Number,
    name:String
});

export default mongoose.model("documenttypes",documentSchema);