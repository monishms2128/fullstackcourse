import express from "express";
import SalesRecord from "../models/SalesRecord.js";

const router = express.Router();

// Revenue over time (supports ?from=&to=)
router.get("/revenue-over-time", async (req, res) => {
  const match = buildDateMatch(req.query);
  const data = await SalesRecord.aggregate([
    { $match: match },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
        revenue: { $sum: "$revenue" },
      },
    },
    { $sort: { _id: 1 } },
  ]);
  res.json(data.map((d) => ({ date: d._id, revenue: d.revenue })));
});

// Revenue by category
router.get("/by-category", async (req, res) => {
  const match = buildDateMatch(req.query);
  const data = await SalesRecord.aggregate([
    { $match: match },
    { $group: { _id: "$category", revenue: { $sum: "$revenue" }, units: { $sum: "$units" } } },
    { $sort: { revenue: -1 } },
  ]);
  res.json(data.map((d) => ({ category: d._id, revenue: d.revenue, units: d.units })));
});

// Revenue by region
router.get("/by-region", async (req, res) => {
  const match = buildDateMatch(req.query);
  const data = await SalesRecord.aggregate([
    { $match: match },
    { $group: { _id: "$region", revenue: { $sum: "$revenue" } } },
    { $sort: { revenue: -1 } },
  ]);
  res.json(data.map((d) => ({ region: d._id, revenue: d.revenue })));
});

// Summary totals
router.get("/summary", async (req, res) => {
  const match = buildDateMatch(req.query);
  const [summary] = await SalesRecord.aggregate([
    { $match: match },
    { $group: { _id: null, totalRevenue: { $sum: "$revenue" }, totalUnits: { $sum: "$units" }, records: { $sum: 1 } } },
  ]);
  res.json(summary || { totalRevenue: 0, totalUnits: 0, records: 0 });
});

function buildDateMatch(query) {
  const match = {};
  if (query.from || query.to) {
    match.date = {};
    if (query.from) match.date.$gte = new Date(query.from);
    if (query.to) match.date.$lte = new Date(query.to);
  }
  if (query.category) match.category = query.category;
  return match;
}

export default router;
