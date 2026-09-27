// Populates the DB with sample sales data for the dashboard to visualize.
import mongoose from "mongoose";
import dotenv from "dotenv";
import SalesRecord from "./models/SalesRecord.js";

dotenv.config();

const CATEGORIES = ["Electronics", "Clothing", "Food", "Furniture"];
const REGIONS = ["North", "South", "East", "West"];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await SalesRecord.deleteMany({});

  const records = [];
  const start = new Date();
  start.setMonth(start.getMonth() - 6);

  for (let d = new Date(start); d <= new Date(); d.setDate(d.getDate() + 3)) {
    CATEGORIES.forEach((category) => {
      REGIONS.forEach((region) => {
        if (Math.random() > 0.5) {
          records.push({
            date: new Date(d),
            category,
            region,
            revenue: Math.floor(Math.random() * 5000) + 500,
            units: Math.floor(Math.random() * 100) + 5,
          });
        }
      });
    });
  }

  await SalesRecord.insertMany(records);
  console.log(`Seeded ${records.length} sales records.`);
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
