import mongoose from 'mongoose';

const travelSchema = mongoose.Schema({
    _id: Number,
    name:String,
    ref:{
        name:String,
        index:[Number]
    }
});

export default mongoose.model("traveldocuments",travelSchema);