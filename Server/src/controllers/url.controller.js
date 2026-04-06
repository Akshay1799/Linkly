import { createShortUrlService } from "../services/url.service.js";

export const createShortUrl = async(req, res, next)=>{
    try {
        const result =  await createShortUrlService(req.body);
        
        res.json({
            message: "URL created successfully",
            data: result
        })
    } catch (error) {
        next(error);
    }
}