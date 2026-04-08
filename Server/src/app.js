// app.js
import express from "express";
import urlRoutes from "./routes/url.routes.js";
import authRoutes from "./routes/auth.routes.js"

export const app = express();

app.use(express.json());


app.use('/api/auth', authRoutes)
app.use('/api/urls', urlRoutes)
