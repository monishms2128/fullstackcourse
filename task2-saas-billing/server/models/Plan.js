import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // free / pro / enterprise
  priceMonthly: { type: Number, required: true }, // in cents
  stripePriceId: { type: String }, // Stripe Price ID for checkout
  features: [{ type: String }],
});

export default mongoose.model("Plan", planSchema);
