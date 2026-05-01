import { config } from "../config/index.js"

const isProduction = config.env === "production";

export const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction?"none" : "lax",
}