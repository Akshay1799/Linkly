
export const createShortUrl = (req, res, next)=>{
    const validatedRequest = req.body;
    console.log(validatedRequest);
    
    res.json({
        message: "URL received",
        data: validatedRequest
    })
}