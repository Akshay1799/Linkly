import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String, 
        required:true,
        trim: true
    },
    email:{
        type:String, 
        required:true, 
        unique:true, 
        trim:true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "Please use a valid email"]
    },
    passwordHash:{
        type:String, 
        required:true, 
        minlength:8

    },
    
},{timestamps:true}) 

const User = mongoose.model("User", userSchema);
export default User;