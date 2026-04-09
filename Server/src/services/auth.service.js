import { config } from "../config/index.js";
import User from "../models/User.models.js";
import jwt from "jsonwebtoken"
import { AppError } from "../utils/AppError.js";
import bcrypt from "bcrypt"

export const registerUserService  = async(data)=>{
    const {name, email, password} = data;

    const existingUser = await User.findOne({email});
    if(existingUser) throw new AppError(401, "User already exists");

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
    if(!user) throw new AppError(401, "Invalid credentials!");

    const isMatch = await user.comparePassword(password);
    if(!isMatch) throw new AppError(401, "Invalid credentials");

    const accessToken = jwt.sign({userId:user._id}, config.jwtSecret, {expiresIn:config.jwtExpiresIn || '15m'})
    const refreshToken = jwt.sign({userId:user._id}, config.jwtSecret, {expiresIn:config.jwtRefreshExpiresIn || '7d'})

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

    user.refreshTokens.push(hashedRefreshToken);
    await user.save()

    return {
        accessToken,
        refreshToken,
        user:{
            _id: user._id,
            name: user.name,
            email: user.email
        }
    };
}

export const refreshAccessTokenService = async(refreshToken)=>{
    if(!refreshToken) throw new AppError(401, "No refresh token provided");

    let decoded;

    try {
        decoded = jwt.verify(refreshToken, config.jwtSecret)
    } catch (error) {
        throw new AppError(401, "Invalid refresh token")
    }

    const user = await User.findById(decoded.userId);
    if(!user) throw new AppError(401, "user not found")

    let tokenIndex = -1;


    for(let i = 0; i < user.refreshTokens.length; i++){
        const match = await bcrypt.compare(refreshToken, user.refreshTokens[i]);
        if(match){
            tokenIndex = i;
            break;
        }

        if(tokenIndex === -1) throw new AppError(401, "Refresh token not recognized")

        user.refreshTokens.splice(tokenIndex, 1);

        const newAccessToken = jwt.sign(
            {userId: user._id},
            config.jwtSecret,
            {expiresIn: config.jwtExpiresIn || "15m"}
        )

        const newRefreshToken = jwt.sign(
            {userId: user._id},
            config.jwtSecret,
            {expiresIn: config.jwtRefreshExpiresIn || "7d"}
        )

        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
        
        user.refreshTokens.push(hashedRefreshToken);
        await user.save();

        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        };
    }
}