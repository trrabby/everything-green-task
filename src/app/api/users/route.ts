/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Users from "@/models/Users";

connectDB();

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

export async function GET() {
  try {
    const users = await Users.find({});
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { name, email, password } = await request.json();

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
      expiresIn: "1h",
    });
    return NextResponse.json({ token }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
