import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json({ message: "Booking successful", booking });
  } catch (error) {
    res.status(400).json({ message: "Booking failed", error: error.message });
  }
});

export default router;
