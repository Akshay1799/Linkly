import {registerUserService, userLoginService} from "../services/auth.service.js";

export const registerUser = async(req, res, next)=>{
    try {
        const user = await registerUserService(req.body);

        res.status(201).json({
            message: "User registered successfully",
            data: user
        });
    } catch (error) {
        next(error)
    }
}

export const login = async(req, res, next)=>{
    try {
        const result = await userLoginService(req.body)
        
        res.status(200).json({
            message: "Logged in successfully!",
            data: result
        })
    } catch (error) {
        next(error)
    }
}