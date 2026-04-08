import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId, ref: "User", req:true},
    originalUrl: {type: String, required: true, trim: true},
    shortCode: {type: String, required: true, unique: true},
    customAlias: {type: String, trim: true},
    totalClicks: {type: Number, default:0}
})

const Url = mongoose.model('Url', urlSchema);
export default Url;