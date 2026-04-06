import express from "express";
import { urlSchema } from "../schemas/url.schema.js";
import { validateRequest } from "../middlewares/validate.middleware.js";
import { createShortUrl } from "../controllers/url.controller.js";


const router = express.Router();

router.post('/', validateRequest(urlSchema),createShortUrl);

export default router;