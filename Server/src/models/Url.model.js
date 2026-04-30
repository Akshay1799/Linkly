import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId, ref: "User", required:true, index: true},
    originalUrl: {type: String, required: true, trim: true},
    shortCode: {type: String, required: true, unique: true},
    customAlias: {type: String, trim: true},
    totalClicks: {type: Number, default:0}
},{timestamps: true})

urlSchema.index({userId: 1, createdAt: -1})

const Url = mongoose.model('Url', urlSchema);
export default Url;