import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log("Connected to MongoDB");
};

export default connectDB;
