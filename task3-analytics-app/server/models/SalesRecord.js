import mongoose from "mongoose";

const salesSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  category: { type: String, required: true }, // e.g. Electronics, Clothing, Food
  region: { type: String, required: true },    // e.g. North, South, East, West
  revenue: { type: Number, required: true },
  units: { type: Number, required: true },
});

export default mongoose.model("SalesRecord", salesSchema);
