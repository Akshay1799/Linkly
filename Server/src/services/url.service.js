import { generateShortCode } from "../utils/generateShortCode.js";
import Url from "../models/Url.model.js";

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