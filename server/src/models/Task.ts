import mongoose from "mongoose";

export interface ITask {
  title: String;
  description?: String;
  completed: boolean;
}

const TaskSchema = new mongoose.Schema<ITask>(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
      minLength: 3,
      maxLength: 100,
    },
    description: {
      type: String,
      trim: true,
      maxLength: 500,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const TaskModel = mongoose.model<ITask>("Task", TaskSchema);

export default TaskModel;
