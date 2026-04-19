import {logoutService, refreshAccessTokenService, registerUserService, userLoginService} from "../services/auth.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {config} from '../config/index.js'

export const registerUser = asyncHandler(async(req, res)=>{
    const user = await registerUserService(req.body);

    res.status(201).json({
        message: "User registered successfully",
        data: user
    });
})

export const login = asyncHandler(async(req, res)=>{
    const result = await userLoginService(req.body)
    const {accessToken, refreshToken, user} = result;

    res
    .cookie("accessToken", accessToken , {
        httpOnly: true,
        secure: config.env === "production",
        sameSite: "strict"
    })
    .cookie("refreshToken", refreshToken , {
        httpOnly: true,
        secure: config.env === "production",
        sameSite: "strict"
    })
    .status(200).json({
        message: "Logged in successfully!",
        data: user
    })
    
})

export const refreshToken = asyncHandler(async(req, res)=>{
    const incomingToken = req.cookies.refreshToken;

    const {accessToken, refreshToken} = await refreshAccessTokenService(incomingToken);

    res.cookie("accessToken", accessToken, {
        httpOnly:true,
        secure: config.env === "production",
        sameSite:"strict"
    })
    .cookie("refreshToken", refreshToken, {
        httpOnly:true,
        secure: config.env === "production",
        sameSite:"strict"
    })
    .status(200).json({
        message: "Access token refreshed"
    })
})

export const logout = asyncHandler(async(req, res)=>{
    const refreshToken = req.cookies.refreshToken;

    await logoutService(refreshToken);

    res
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .status(200)
    .json({
        message: "logged out successfully!"
    })
})