import express from "express";
import User from "../models/User.js";
import Plan from "../models/Plan.js";
import auth from "../middleware/auth.js";
import requireRole from "../middleware/requireRole.js";

const router = express.Router();
router.use(auth, requireRole("admin"));

// list all users (admin only)
router.get("/users", async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

// change a user's role
router.put("/users/:id/role", async (req, res) => {
  const { role } = req.body;
  const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

// manage plans
router.post("/plans", async (req, res) => {
  const plan = await Plan.create(req.body);
  res.status(201).json(plan);
});

router.put("/plans/:id", async (req, res) => {
  const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(plan);
});

export default router;
