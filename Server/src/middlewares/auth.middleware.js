import jwt from "jsonwebtoken";
import { config } from "../config/index.js";

export const protect = async(req, res, next)=>{
    try {
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer ")){
            throw new Error("Unauthorized: No token")
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, config.jwtSecret)

        req.user = decoded;
        
        next();

    } catch (error) {
        next(error)
    }
}