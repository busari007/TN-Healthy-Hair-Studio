import axios from "axios";
import crypto from "crypto";
import { createBooking } from "./bookingController.js";

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;

export const initPaystackPayment = async (req, res) => {
  try {
    const { amount, email_address, bookingData } = req.body;

    const paystackResponse = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email: email_address,
        amount: amount * 100,
        metadata: bookingData,
        callback_url: "http://localhost:5173/payment-success"
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET}`
        }
      }
    );

    return res.json({
      authorization_url: paystackResponse.data.data.authorization_url,
      reference: paystackResponse.data.data.reference
    });

  } catch (err) {
    console.error(err.response?.data || err);
    res.status(500).json({ error: "Paystack initialization failed" });
  }
};



export const paystackWebhook = async (req, res) => {
  // Validate signature
  const hash = crypto
    .createHmac("sha512", PAYSTACK_SECRET)
    .update(req.rawBody.toString())     // MUST use raw body!
    .digest("hex");

  if (hash !== req.headers["x-paystack-signature"]) {
    return res.status(400).send("Invalid signature");
  }

  const { event, data } = JSON.parse(req.rawBody);

  // Handle successful charge
  if (event === "charge.success") {
    try {
      const bookingData = data.metadata;

      // Fake req/res for createBooking
      const fakeReq = { body: bookingData };
      const fakeRes = { status: () => fakeRes, json: () => null };

      await createBooking(fakeReq, fakeRes);

      return res.sendStatus(200);
    } catch (error) {
      console.error("Booking creation failed:", error);
      return res.sendStatus(500);
    }
  }

  return res.sendStatus(200);
};
