import { createShortUrlService } from "../services/url.service.js";

export const createShortUrl = (req, res, next)=>{
    const result =  createShortUrlService(req.body);
    console.log(result);
    
    res.json({
        message: "URL received",
        data: result
    })
}