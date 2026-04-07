import { generateShortCode } from "../utils/generateShortCode.js";
import Url from "../models/Url.model.js";
import { url } from "zod";

export const createShortUrlService = async(data) => {
  let shortCode;

  if (data.customAlias && data.customAlias.trim() !== "") {
    shortCode = data.customAlias;
  } else {
    shortCode = generateShortCode();
  }

  const newUrl = new Url ({
    ...data,
    shortCode,
  });

  const savedUrl = await newUrl.save();
  return savedUrl;
};

export const getUrlByShortCode = async(shortCode)=>{
  let originalUrl = await Url.findOneAndUpdate(
    {shortCode},
    {$inc : {totalClicks: 1}},
    {new: true}
  )
  if(!originalUrl) throw new Error('original URL does not exist!');

  
  return originalUrl;
}

export const getUrlStats = async(shortCode)=>{

  const url = await Url.findOne({shortCode})
  if(!url) throw new Error('url does not exist');
  
  return{
    originalUrl: url.originalUrl,
    shortCode: url.shortCode,
    totalClicks: url.totalClicks
  }
}