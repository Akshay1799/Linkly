import User from "../models/User.models.js";

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