import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    role: String
});

export default mongoose.model("users",userSchema);