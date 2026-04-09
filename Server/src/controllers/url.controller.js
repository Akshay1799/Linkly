import { createShortUrlService, getUrlByShortCode, getUrlStats } from "../services/url.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createShortUrl = asyncHandler(async(req, res, next)=>{
    const result =  await createShortUrlService(req.body, req.user.userId);
    
    res.status(201).json({
        message: "URL created successfully",
        data: result
    })
})

export const redirectToOriginalUrl = async(async(req, res)=>{
    let shortCode = req.params.shortCode;

    const ip = req.headers["x-forwarded-for"] || req.ip;
    const userAgent = req.headers["user-agent"];
    const referrer = req.headers["referer"];

    let url = await getUrlByShortCode(shortCode, {ip, userAgent, referrer});
    res.redirect(url.originalUrl);
    
})

export const getUrlStatsController = asyncHandler(async(req, res)=>{
    let shortCode = req.params.shortCode;
    const urlStats = await getUrlStats(shortCode);
    res.status(200).json({
        message:"URL Stats recieved successfully!",
        data: urlStats
    })
    
})