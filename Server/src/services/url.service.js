import { generateShortCode } from "../utils/generateShortCode.js";
import Url from "../models/Url.model.js";
import Click from "../models/Click.model.js";

export const createShortUrlService = async (data) => {
  let shortCode;

  if (data.customAlias && data.customAlias.trim() !== "") {
    shortCode = data.customAlias;
  } else {
    shortCode = generateShortCode();
  }

  const newUrl = new Url({
    ...data,
    shortCode,
  });

  const savedUrl = await newUrl.save();
  return savedUrl;
};

export const getUrlByShortCode = async (shortCode, analyticsData) => {
  const { ip, userAgent, referrer } = analyticsData;

  let originalUrl = await Url.findOneAndUpdate(
    { shortCode },
    { $inc: { totalClicks: 1 } },
    { new: true },
  );
  if (!originalUrl) throw new Error("original URL does not exist!");

  const newClick = await Click.create({
    urlId: originalUrl._id,
    shortCode,
    ip,
    device: userAgent,
    referrer,
  });

  return originalUrl;
};

export const getUrlStats = async (shortCode) => {
  const url = await Url.findOne({ shortCode });
  if (!url) throw new Error("url does not exist");

  const recentClicks = await Click.find({ shortCode })
    .sort({ createdAt: -1 })
    .limit(5);
  const totalClicks = url.totalClicks;

  const deviceStatsRaw = await Click.aggregate([
    {
      $match: { shortCode },
    },
    {
      $group: {
        _id: {
          $cond: [
            { $regexMatch: { input: "$device", regex: /mobile/i } },
            "mobile",
            "desktop",
          ],
        },
        count: { $sum: 1 },
      },
    },
  ]);

  let mobile = 0;
  let desktop = 0;

  deviceStatsRaw.forEach((stat) => {
    if (stat._id === "mobile") mobile = stat.count;
    if (stat._id === "desktop") desktop = stat.count;
  });

  const uniqueVisitorsResult = await Click.aggregate([
    {
      $match: { shortCode },
      ip: {$ne:null}
    },
    {
      $group: {
        _id: "$ip",
      },
    },
    {
      $group: {
        _id: null,
        uniqueVisitors: { $sum: 1 },
      },
    },
  ]);

  const uniqueVisitors = uniqueVisitorsResult[0]?.uniqueVisitors || 0;

  return {
    originalUrl: url.originalUrl,
    shortCode: url.shortCode,
    totalClicks,
    recentClicks,
    deviceStats: {
      mobile,
      desktop,
    },
    uniqueVisitors
  };
};
