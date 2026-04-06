import { generateShortCode } from "../utils/generateShortCode.js";

export const createShortUrlService = (data) => {
  let shortCode;

  if (data.customAlias && data.customAlias.trim() !== "") {
    shortCode = data.customAlias;
  } else {
    shortCode = generateShortCode();
  }

  return {
    ...data,
    shortCode,
  };
};
