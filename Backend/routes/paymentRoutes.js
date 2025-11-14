import express from "express";
import { initPaystackPayment, paystackWebhook } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/init", initPaystackPayment);
router.post("/webhook", paystackWebhook);

export default router;
