import mongoose from "mongoose";
import chalk from "chalk";

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined");
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log(chalk.black.bgGreen.bold("✓ Connected to MongoDB "));
  } catch (error) {
    console.error(chalk.white.bgRed.bold("✗ MongoDB Connection Failed "));
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
