import express from "express";
import { login, logout, refreshToken, registerUser } from "../controllers/auth.controller.js";
import { authLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();

router.post('/register', authLimiter, registerUser);
router.post('/login', authLimiter, login)
router.post('/refresh',authLimiter, refreshToken);
router.post('/logout', logout)

export default router;