import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "your_mongodb_connection_string";

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");
};

export default connectDB;
