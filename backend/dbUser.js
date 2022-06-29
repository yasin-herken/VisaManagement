import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: String,
    surname: String,
    username: String,
    password: String,
<<<<<<< HEAD
    email: String,
=======
>>>>>>> 65effdf74a61b4a750175e20f76fb43a3657dd0e
    role: String
});

export default mongoose.model("users",userSchema);