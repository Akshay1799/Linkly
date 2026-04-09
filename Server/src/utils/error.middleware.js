export const errorHandler = (err, req, res, next)=>{
    console.log(err);

    const statusCode = err.statusCode || 500;
    const status = err.status || "error";

    res.status(statusCode).json({
        status,
        message: err.message || "Internal server error"
    })
    
}