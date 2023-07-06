import * as mongoose from "mongoose";
import { model } from "mongoose";


const UserSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

export default model("user", UserSchema);