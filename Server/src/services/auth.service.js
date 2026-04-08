import { config } from "../config/index.js";
import User from "../models/User.models.js";
import jwt from "jsonwebtoken"

export const registerUserService  = async(data)=>{
    const {name, email, password} = data;

    const existingUser = await User.findOne({email});
    if(existingUser) throw new Error("User already exists");

    const user = await User.create({
        name,
        email,
        password
    })

    return {
        id: user._id,
        name: user.name,
        email: user.email
    };
}

export const userLoginService = async(data)=>{
    const {email, password} = data;

    const user = await User.findOne({email}).select("+password");
    if(!user) throw new Error("Invalid credentials!");

    const isMatch = await user.comparePassword(password);
    if(!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign({userId:user._id}, config.jwtSecret, {expiresIn:config.jwtExpiresIn || '1d'})

    return {
        token,
        user:{
            _id: user._id,
            name: user.name,
            email: user.email
        }
    };
}