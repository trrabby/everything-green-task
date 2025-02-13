import crypto from "crypto";

const WEBHOOK_SECRET = "everyThingGreen_webhook_secret_key";
const body = JSON.stringify({ eventType: "test", data: { foo: "bar" } });
const hmac = crypto.createHmac("sha256", WEBHOOK_SECRET);
const signature = hmac.update(body).digest("hex");

console.log("body:", body);
console.log("Signature:", signature);
