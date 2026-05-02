import jwt from "jsonwebtoken";
import { config } from "../config/index.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";

export const protect = asyncHandler(async (req, res, next) => {
  
    console.log("Cookies received:", req.cookies);
    console.log("Authorization header:", req.headers.authorization);
    
    let token;

  if (req.cookies?.accessToken) {
    token = req.cookies.accessToken;
  }else if(req.headers.authorization?.startsWith("Bearer ")){
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new AppError(401, "Unauthorized: No token");
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("JWT verification failed:", err.message);
    throw new AppError(401, "Unauthorized: Invalid or expired token");
  }
  

});
