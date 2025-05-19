//routes/task.js
const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ userId: req.userId });
  res.json(tasks);
});

router.post("/", auth, async (req, res) => {
  const task = await Task.create({ ...req.body, userId: req.userId });
  res.json(task);
});

router.put("/:id", auth, async (req, res) => {
  const task = await Task.findOneAndUpdate({ _id: req.params.id, userId: req.userId }, req.body, { new: true });
  res.json(task);
});

router.delete("/:id", auth, async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  res.json({ message: "Deleted" });
});

module.exports = router;
