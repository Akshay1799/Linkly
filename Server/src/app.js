// app.js
import express from "express";
import urlRoutes from "./routes/url.routes.js";


export const app = express();

app.use(express.json());

app.get('/', (req, res)=>{
    res.json({status:'ok'})
})

app.use('/api/urls', urlRoutes)
