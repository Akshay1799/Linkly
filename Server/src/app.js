import express from "express";
import urlRoutes from "./routes/url.routes.js";


const app = express();

const PORT = 4000;

app.use(express.json());

app.get('/', (req, res)=>{
    res.json({status:'ok'})
})

app.use('/api/urls', urlRoutes)

app.listen(PORT, ()=>console.log(`Server is listening on port: ${PORT}`))