import express from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

import {
  createTaskValidation,
  updateTaskValidation,
  deleteTaskValidation,
} from "../validations/taskValidation.js";
import validate from "../middleware/validationMiddleware.js";

const router = express.Router();

router.post("/", createTaskValidation, validate, createTask);
router.get("/", getTasks);
router.patch("/:id", updateTaskValidation, validate, updateTask);
router.delete("/:id", deleteTaskValidation, validate, deleteTask);

export default router;
