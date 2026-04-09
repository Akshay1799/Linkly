import dotenv from "dotenv";
dotenv.config();

export const config = {
    port:process.env.PORT || 4000,
    env:process.env.NODE_ENV,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
    jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    mongoUri: process.env.MONGO_URI,
    clientUrl: process.env.CLIENT_URL,
    
}