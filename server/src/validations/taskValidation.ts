import { body, param } from "express-validator";

export const createTaskValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Task title is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Task title must be between 3 and 100 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),
];

export const updateTaskValidation = [
  param("id").isMongoId().withMessage("Invalid task id"),
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Task title cannot be empty")
    .isLength({ min: 3, max: 100 })
    .withMessage("Task title must be between 3 and 100 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),
  body("completed")
    .optional()
    .isBoolean()
    .withMessage("completed must be a boolean"),
];

export const deleteTaskValidation = [
  param("id").isMongoId().withMessage("Invalid task id"),
];
