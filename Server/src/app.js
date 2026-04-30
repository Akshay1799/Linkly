// app.js
import express from "express";
import urlRoutes from "./routes/url.routes.js";
import authRoutes from "./routes/auth.routes.js"
import { errorHandler } from "./utils/error.middleware.js";
import cookieParse from "cookie-parser"
import { globalLimiter } from "./middlewares/rateLimiter.js";
import cors from "cors";
import { config } from "./config/index.js";


export const app = express();

app.use(express.json());
app.use(cookieParse());

app.use(
    cors({
        origin: config.clientUrl,
        credentials: true
    })
)

app.use(globalLimiter)

app.use('/api/auth', authRoutes)
app.use('/api/urls', urlRoutes)


app.use(errorHandler)