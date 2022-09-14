import mongoose from 'mongoose';

const priceSchema = mongoose.Schema({
    service: {
        name: String,
        price: Number
    }
});
export default mongoose.model("additionalPrices",priceSchema);