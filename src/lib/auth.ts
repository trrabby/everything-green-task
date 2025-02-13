/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = "everyThingGreen_client_secret_key";

export const authenticate = async (request: NextRequest, next: Function) => {
  // Get the token from the Authorization header
  const authHeader = request.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json(
      { message: "Unauthorized: No token provided" },
      { status: 401 }
    );
  }

  const token = authHeader;

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, SECRET_KEY) as { userId: string };

    // If authentication is successful, call next()
    return next(decoded.userId);
  } catch (error) {
    return NextResponse.json(
      { message: "Unauthorized: Invalid or expired token", error },
      { status: 401 }
    );
  }
};
