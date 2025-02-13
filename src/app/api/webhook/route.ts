/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";

// Path to the db.json file
const dbPath = path.join(process.cwd(), "db.json");

// Secret key for signature verification (replace with your actual secret key)
const WEBHOOK_SECRET = "everyThingGreen_webhook_secret_key";

const validateSignature = (body: string, signature: string): boolean => {
  //   console.log(body, signature);
  const hmac = crypto.createHmac("sha256", WEBHOOK_SECRET);
  const calculatedSignature = hmac.update(body).digest("hex");
  console.log(calculatedSignature);
  return signature === calculatedSignature;
};

const storeData = (eventType: string, data: any) => {
  // Read the existing data from db.json
  let dbData = [];
  if (fs.existsSync(dbPath)) {
    const fileContent = fs.readFileSync(dbPath, "utf-8");
    dbData = JSON.parse(fileContent);
  }

  // Add the new data
  dbData.push({ eventType, data, timestamp: new Date().toISOString() });

  // Write the updated data back to db.json
  fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));
};

export async function POST(request: Request) {
  try {
    // Read the request body as text (to validate the signature)
    const body = await request.text();

    // Get the signature from the request headers
    const signature = request.headers.get("x-signature") || "";

    // Validate the signature
    if (!validateSignature(body, signature)) {
      return NextResponse.json(
        { success: false, message: "Invalid signature" },
        { status: 401 }
      );
    }

    // Parse the request body as JSON
    const { eventType, data } = JSON.parse(body);

    // Store the data in db.json
    storeData(eventType, data);

    // Return a success response
    return NextResponse.json(
      { success: true, message: "Received" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
