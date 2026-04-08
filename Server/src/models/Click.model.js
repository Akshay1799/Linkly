import mongoose from "mongoose";

const clickSchema = new mongoose.Schema({
    urlId:{type:mongoose.Schema.Types.ObjectId, ref:"Url", required:true},
    shortCode:{type:String,  required: true},
    device:{type:String},
    ip:{type:String},
    referrer:{type:String}
},{timestamps:true})

const Click = mongoose.model('Click', clickSchema);
export default Click;