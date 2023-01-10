import mongoose from 'mongoose';
import Country from "./enum/country.js";
import Role from "./enum/user.js";
const userSchema = mongoose.Schema({
    username: String,
    password: String,
    role: {
        type: String,
        enum: [Role.Admin, Role.All]
    },
    country: {
        type: String,
        enum: [Country.MALI, Country.SIERRA, Country.GANA, Country.GINE, Country.GAMBIA, Country.All]
    },
    admin: Boolean
});

export default mongoose.model("users", userSchema);