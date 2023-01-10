import mongoose from 'mongoose';
import Country from './enum/country.js';
const serviceSchema = mongoose.Schema({
    name: String,
    price: String,
});
const priceSchema = mongoose.Schema({
    country: {
        name: {
            type: String,
            enum: [Country.GAMBIA, Country.GANA, Country.GINE, Country.MALI, Country.SIERRA,Country.All]
        },
        service: [
            serviceSchema
        ]
    }
});
export default mongoose.model("additionalPrices", priceSchema);