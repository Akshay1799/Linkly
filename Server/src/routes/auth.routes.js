import express from "express";
import { login, refreshToken, registerUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', login)
router.post('/refresh', refreshToken);

export default router;