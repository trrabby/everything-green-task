import mongoose, { model, Schema } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
}

const userSchema: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"], // Custom error message
      trim: true, // Remove extra spaces
    },
    email: {
      type: String,
      required: [true, "Email is required"], // Custom error message
      unique: true,
      trim: true,
      lowercase: true, // Convert email to lowercase
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"], // Regex validation
    },
    password: {
      type: String,
      required: [true, "Password is required"], // Custom error message
      minlength: [6, "Password must be at least 6 characters long"], // Minimum length
    },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
  }
);

// Check if the model already exists to avoid OverwriteModelError
export const UserModel =
  mongoose.models.Users || model<IUser>("Users", userSchema);
