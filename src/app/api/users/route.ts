/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UserModel } from "@/models/Users";
import { authenticate } from "@/lib/auth";

const SECRET_KEY = "everyThingGreen_client_secret_key";

// Connect to the database
connectDB();

// 🔹 GET Request: Fetch user data after authentication
export async function GET(request: NextRequest) {
  return authenticate(request, async () => {
    try {
      const user = await UserModel.find();
      return NextResponse.json(user);
    } catch (error) {
      return NextResponse.json(
        { message: "Server error", error },
        { status: 500 }
      );
    }
  });
}

// 🔹 POST Request: Register a new user & generate a token
export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = { name, email, password: hashedPassword };

    // Create user in DB
    const user = await UserModel.create(userData);

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
      expiresIn: "1h",
    });

    return NextResponse.json(
      { message: "User created successfully", accessToken: token, user },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
}
