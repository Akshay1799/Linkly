import { config } from "../config/index.js";

export const errorHandler = (err, req, res, next)=>{
    console.log(err);

    const statusCode = err.statusCode || 500;
    const status = err.status || "error";

    if(config.env === "development"){
        return res.status(statusCode).json({
            status,
            message: err.message,
            stack: err.stack
        })
    }

    if(config.env === "production"){
        if(err.statusCode){
            return res.status(statusCode).json({
                status,
                message: err.message
            })
        }
    }
    res.status(500).json({
        status: "error",
        message: "Something went wrong"
    })
    
}