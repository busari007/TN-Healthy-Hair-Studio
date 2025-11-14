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
        metadata: bookingData
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
  const hash = crypto
    .createHmac("sha512", PAYSTACK_SECRET)
    .update(JSON.stringify(req.body))
    .digest("hex");

  if (hash !== req.headers["x-paystack-signature"]) {
    return res.status(400).send("Invalid signature");
  }

  const { event, data } = req.body;

  if (event === "charge.success") {
    const bookingData = data.metadata;

    // create booking in Firestore
    req.body = bookingData;  
    await createBooking(req, res);

    return;
  }

  res.sendStatus(200);
};
