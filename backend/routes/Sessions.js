import express from "express";
import Session from "../models/Session.js";

const router = express.Router();

// POST new session
router.post("/", async(req, res) => {
  try {
    const newSession = new Session(req.body);
    const savedSession = await newSession.save();
    res.status(201).json(savedSession);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});
// GET all sessions
router.get("/", async(req, res) => {
  try{
    const sessions = await Session.find().populate('taskId');
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

export default router;