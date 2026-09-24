import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    plan: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "usd" },
    stripeSessionId: { type: String },
    status: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
