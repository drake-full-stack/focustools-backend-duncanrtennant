import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

// POST new task
router.post("/", async(req, res) => {
  try {
    const newTask = new Task(req.body);
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});
// GET all tasks
router.get("/", async(req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});
// GET task by id
router.get("/:id", async(req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: 'Task not found'
      });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message});
  }
});
// PUT updated task by id
router.put("/:id", async(req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id, 
      req.body,
      { 
        new: true,           // Return updated version
        runValidators: true  // Check schema rules
      }
    );

    if (!task){
      return res.status(404).json({
        message: 'Task not found'
      });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message});
  }
});
// DELETE task by id
router.delete("/:id", async(req, res) => {
  try {
    const task = await Task.findByIdAndDelete(
      req.params.id, 
    );

    if (!task){
      return res.status(404).json({
        message: 'Task not found'
      });
    }

    res.status(200).json({
      message: `Task deleted successfully`,
      task: task,
    });
  } catch (error) {
    res.status(500).json({ message: error.message});
  }
});

export default router;