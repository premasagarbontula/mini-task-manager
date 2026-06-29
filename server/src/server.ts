import express from "express";
import chalk from "chalk";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

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
