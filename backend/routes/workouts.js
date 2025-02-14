import express from "express";
import {
  allWorkouts,
  createWorkout,
  deleteWorkout,
  singleWorkout,
  updateWorkout,
} from "../controllers/workoutController.js";

const router = express.Router();

// Get all workouts
router.get("/", allWorkouts);

// GET a single workout
router.get("/:id", singleWorkout);

// POST a new workout
router.post("/", createWorkout);

// DELETE a workout
router.delete("/:id", deleteWorkout);

// UPDATE a workout
router.patch("/:id", updateWorkout);

export default router;
