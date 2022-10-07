import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    role: {
        type: String,
        enum: ["Admin", "Client"]
    },
    country: {
        type: String,
        enum: ["MALI", "SIERRA", "GANA", "GINE", "GAMBIA", "ALL"]
    }
});

export default mongoose.model("users", userSchema);