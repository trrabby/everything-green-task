/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { UserModel } from "@/models/Users";
import { authenticate } from "@/lib/auth";

const SECRET_KEY = "everyThingGreen_client_secret_key";

// Connect to the database
connectDB();

// 🔹 GET Request: Fetch all users after authentication
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return authenticate(request, async () => {
    try {
      const user = await UserModel.find({ _id: params.id });
      return NextResponse.json(user);
    } catch (error) {
      return NextResponse.json(
        { message: "Server error", error },
        { status: 500 }
      );
    }
  });
}
