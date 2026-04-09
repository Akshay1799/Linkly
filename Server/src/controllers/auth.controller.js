import {registerUserService, userLoginService} from "../services/auth.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const registerUser = asyncHandler(async(req, res)=>{
    const user = await registerUserService(req.body);

    res.status(201).json({
        message: "User registered successfully",
        data: user
    });
})

export const login = asyncHandler(async(req, res)=>{
    const result = await userLoginService(req.body)
    
    res.status(200).json({
        message: "Logged in successfully!",
        data: result
    })
    
})