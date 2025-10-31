import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  date: String,
  slot: String,
  experienceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Experience",
  },
  status: { type: String, default: "Confirmed" },
});

export default mongoose.model("Booking", bookingSchema);
