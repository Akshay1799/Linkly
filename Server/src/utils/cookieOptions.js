import { config } from "../config/index.js"

export const cookieOptions = {
    httpOnly: true,
    sameSite: "lax",
    secure: config.env === "production"
}