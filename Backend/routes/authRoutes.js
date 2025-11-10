import express from "express";
import { signUpUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signUpUser);
router.post("/signin", loginUser);

export default router;
