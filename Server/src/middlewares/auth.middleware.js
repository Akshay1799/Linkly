import jwt from "jsonwebtoken";
import { config } from "../config/index.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";

export const protect = asyncHandler(async(req, res, next)=>{
    const authHeader = req.cookies.accessToken;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        throw new AppError(401, "Unauthorized: No token")
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, config.jwtSecret)
    if(!decoded){
        throw new AppError(401, "Invalid token")
    }

    req.user = decoded;
    
    next();
    
})