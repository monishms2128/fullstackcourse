import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "manager", "user"], default: "user" },
    plan: { type: String, enum: ["free", "pro", "enterprise"], default: "free" },
    stripeCustomerId: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
