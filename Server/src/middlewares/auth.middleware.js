import jwt from "jsonwebtoken";
import { config } from "../config/index.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const protect = asyncHandler(async(req, res, next)=>{
    const authHeader = req.headers.authorization;
    
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        throw new Error("Unauthorized: No token")
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, config.jwtSecret)

    req.user = decoded;
    
    next();
    
})