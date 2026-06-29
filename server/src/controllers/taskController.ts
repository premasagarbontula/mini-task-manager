import type { Request, Response } from "express";
import taskModel from "../models/Task.js";

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;

    const newTask = {
      title: title.trim(),
      description: description?.trim(),
    };
    const task = await taskModel.create(newTask);

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await taskModel.find().sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Tasks fetched successfully",
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateTask = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const { title, description, completed } = req.body;

    const task = await taskModel.findById(id);
    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }
    if (typeof title === "string") {
      const trimmedTitle = title.trim();

      if (!trimmedTitle) {
        return res.status(400).json({
          message: "Task title cannot be empty",
        });
      }

      task.title = trimmedTitle;
    }
    if (typeof description === "string") {
      task.description = description.trim();
    }
    if (typeof completed === "boolean") {
      task.completed = completed;
    }
    await task.save();

    return res.status(200).json({
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteTask = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const task = await taskModel.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    return res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
