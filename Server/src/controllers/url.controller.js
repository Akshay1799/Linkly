import { createShortUrlService, getUrlByShortCode } from "../services/url.service.js";

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

export const redirectToOriginalUrl = async(req, res, next)=>{
    try {
        let shortCode = req.params.shortCode;
        let url = await getUrlByShortCode(shortCode);
        res.redirect(url.originalUrl);
    } catch (error) {
        next(error)
    }
    
}