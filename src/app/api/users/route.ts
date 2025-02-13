/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UserModel } from "@/models/Users";

connectDB();

const SECRET_KEY = "everyThingGreen_client_secret_key";
import { authenticate } from "@/lib/auth";

export async function GET(request: NextRequest) {
  // Authenticate the request
  const userId = await authenticate(request);

  // If authentication fails, return the error response
  if (userId instanceof NextResponse) {
    return userId;
  }

  try {
    // Fetch the user from the database
    const user = await UserModel.findById(userId);

    // If the user is not found, return a 404 error
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Return the user data
    return NextResponse.json(user);
  } catch (error) {
    // Handle server errors
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { name, email, password } = await request.json();

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = { name, email, password: hashedPassword };
    const user = await UserModel.create(userData);

    const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
      expiresIn: "1h",
    });
    return NextResponse.json(
      { message: "User created successfully", accessToken: token, user },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: { "Server error": error } },
      { status: 500 }
    );
  }
}
