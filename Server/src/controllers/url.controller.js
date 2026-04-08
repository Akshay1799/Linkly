import { createShortUrlService, getUrlByShortCode, getUrlStats } from "../services/url.service.js";

export const createShortUrl = async(req, res, next)=>{
    try {
        const result =  await createShortUrlService(req.body, req.user.userId);
        
        res.status(201).json({
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

        const ip = req.headers["x-forwarded-for"] || req.ip;
        const userAgent = req.headers["user-agent"];
        const referrer = req.headers["referer"];

        let url = await getUrlByShortCode(shortCode, {ip, userAgent, referrer});
        res.redirect(url.originalUrl);
    } catch (error) {
        next(error)
    }
    
}

export const getUrlStatsController = async(req, res, next)=>{
    try {
        let shortCode = req.params.shortCode;
        const urlStats = await getUrlStats(shortCode);
        res.status(200).json({
            message:"URL Stats recieved successfully!",
            data: urlStats
        })
    } catch (error) {
        next(error)
    }
    
}