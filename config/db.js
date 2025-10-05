const mongoose = require("mongoose");
const pino = require("pino")();
require("dotenv").config();

const connectDB = async () => {
  console.log("Connecting to MongoDB...", process.env.MONGO_URI);
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.info("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    pino.error(err); // log full error object
    process.exit(1);
  }
};

module.exports = connectDB;
