import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    plan: { type: String, required: true },
    amount: { type: Number, required: true }, // cents
    status: { type: String, enum: ["paid", "failed", "pending"], default: "pending" },
    stripeSessionId: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Invoice", invoiceSchema);
