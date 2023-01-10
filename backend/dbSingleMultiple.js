import mongoose from "mongoose";


const singleMultipleSchema = mongoose.Schema({
    country: String,
    prices: {
        single: {
            type: String
        },
        multiple: {
            type: String
        }
    }
})

export default mongoose.model("singlemultiples", singleMultipleSchema)