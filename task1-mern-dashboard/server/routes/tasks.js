import express from "express";
import Task from "../models/Task.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.use(auth);

// GET all tasks for logged-in user (supports ?status=&priority=)
router.get("/", async (req, res) => {
  const filter = { owner: req.userId };
  if (req.query.status) filter.status = req.query.status;
  if (req.query.priority) filter.priority = req.query.priority;
  const tasks = await Task.find(filter).sort({ createdAt: -1 });
  res.json(tasks);
});

// CREATE task
router.post("/", async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, owner: req.userId });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: "Could not create task", error: err.message });
  }
});

// UPDATE task
router.put("/:id", async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, owner: req.userId },
    req.body,
    { new: true }
  );
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json(task);
});

// DELETE task
router.delete("/:id", async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.userId });
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json({ message: "Task deleted" });
});

export default router;
