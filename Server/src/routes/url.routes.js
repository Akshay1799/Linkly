import express from "express";
import { urlSchema } from "../schemas/url.schema.js";
import { validateRequest } from "../middlewares/validate.middleware.js";
import { createShortUrl, deleteUrl, getMyUrlsController, redirectToOriginalUrl } from "../controllers/url.controller.js";
import { getUrlStatsController } from "../controllers/url.controller.js";
import { protect } from "../middlewares/auth.middleware.js";


const router = express.Router();

router.post('/', protect, validateRequest(urlSchema), createShortUrl);
router.get('/:shortCode/stats', getUrlStatsController)
router.get('/:shortCode', redirectToOriginalUrl)
router.get('/my', getMyUrlsController)
router.delete('/:id', protect, deleteUrl)


export default router;