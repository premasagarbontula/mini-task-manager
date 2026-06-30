import express from "express";
import chalk from "chalk";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);

app.use("/api/tasks", taskRoutes);

const port = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(chalk.black.bgGreen.bold(` Server running on port ${port} `));
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

startServer();
