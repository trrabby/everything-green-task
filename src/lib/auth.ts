import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

export const authenticate = async (request: NextRequest) => {
  // Get the token from the Authorization header
  const authHeader = request.headers.get("authorization");

  console.log(authHeader);
  // If no token is provided, return an unauthorized response
  if (!authHeader) {
    return NextResponse.json(
      { message: "Unauthorized: No token provided" },
      { status: 401 }
    );
  }

  // Extract the token from the header
  const token = authHeader;
  console.log(token);
  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, SECRET_KEY) as { userId: string };

    // Return the user ID from the decoded token
    return decoded.userId;
  } catch (error) {
    // Handle invalid or expired tokens
    return NextResponse.json(
      { message: "Unauthorized: Invalid or expired token", error },
      { status: 401 }
    );
  }
};
