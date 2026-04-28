import express, { Router } from "express";
import { urlSchema } from "../schemas/url.schema.js";
import { validateRequest } from "../middlewares/validate.middleware.js";
import { createShortUrl, deleteUrl, getMyUrlsController, redirectToOriginalUrl, updateUrl } from "../controllers/url.controller.js";
import { getUrlStatsController } from "../controllers/url.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { apiLimiter } from "../middlewares/rateLimiter.js";


const router = express.Router();

router.use(apiLimiter)

router.post('/', protect, validateRequest(urlSchema), createShortUrl);
router.get('/my',protect, getMyUrlsController)

router.get('/:shortCode/stats', getUrlStatsController)
router.get('/:shortCode', redirectToOriginalUrl)

router.delete('/:id', protect, deleteUrl)
router.put('/:id', protect, updateUrl)


export default router;