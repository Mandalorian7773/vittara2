import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";

// Force Node.js runtime for crypto and nodemailer
export const runtime = "nodejs";

// Disable body parser to get raw body for signature verification
export const config = {
    api: {
        bodyParser: false,
    },
};

// Hardcoded for deployment (move to env vars in production dashboard)
const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET || "your_webhook_secret_here";
const MAIL_USER = process.env.MAIL_USER || "";
const MAIL_PASS = process.env.MAIL_PASS || "";
const STORE_OWNER_EMAIL = process.env.MAIL_USER || ""; // Send to same email

// Verify Razorpay signature
function verifySignature(body: string, signature: string, secret: string): boolean {
    const expectedSignature = crypto
        .createHmac("sha256", secret)
        .update(body)
        .digest("hex");
    return expectedSignature === signature;
}

// Send email notification
async function sendEmailNotification(paymentData: {
    paymentId: string;
    amount: number;
    email: string;
    contact: string;
    method: string;
}) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: MAIL_USER,
            pass: MAIL_PASS,
        },
    });

    const timestamp = new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
    });

    const mailOptions = {
        from: `"Fittara Store" <${MAIL_USER}>`,
        to: STORE_OWNER_EMAIL,
        subject: "🛒 New Order Received - Fittara",
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9;">
        <div style="background: #000; color: #fff; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">🛒 New Order Received!</h1>
        </div>
        <div style="background: #fff; padding: 30px; border: 1px solid #eee;">
          <h2 style="color: #333; margin-top: 0;">Payment Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">Amount</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; text-align: right;">₹${(paymentData.amount / 100).toLocaleString("en-IN")}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">Payment ID</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-family: monospace; text-align: right;">${paymentData.paymentId}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">Customer Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; text-align: right;">${paymentData.email || "N/A"}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">Customer Phone</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; text-align: right;">${paymentData.contact || "N/A"}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">Payment Method</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; text-align: right; text-transform: capitalize;">${paymentData.method}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #666;">Timestamp</td>
              <td style="padding: 10px 0; text-align: right;">${timestamp}</td>
            </tr>
          </table>
        </div>
        <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
          <p>This is an automated notification from Fittara Store.</p>
        </div>
      </div>
    `,
    };

    await transporter.sendMail(mailOptions);
}

export async function POST(req: NextRequest) {
    try {
        // Get raw body for signature verification
        const rawBody = await req.text();
        const signature = req.headers.get("x-razorpay-signature");

        if (!signature) {
            console.error("Webhook Error: Missing signature");
            return NextResponse.json({ error: "Missing signature" }, { status: 400 });
        }

        // Verify signature
        if (!verifySignature(rawBody, signature, RAZORPAY_WEBHOOK_SECRET)) {
            console.error("Webhook Error: Invalid signature");
            return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
        }

        // Parse the payload
        const payload = JSON.parse(rawBody);
        const event = payload.event;

        console.log(`Webhook received: ${event}`);

        // Only process payment.captured events
        if (event === "payment.captured") {
            const payment = payload.payload.payment.entity;

            const paymentData = {
                paymentId: payment.id,
                amount: payment.amount,
                email: payment.email || "",
                contact: payment.contact || "",
                method: payment.method || "unknown",
            };

            console.log("Payment captured:", paymentData);

            // Send email notification
            if (MAIL_USER && MAIL_PASS) {
                await sendEmailNotification(paymentData);
                console.log("Email notification sent successfully");
            } else {
                console.warn("Email credentials not configured, skipping notification");
            }
        }

        return NextResponse.json({ status: "ok" });
    } catch (error: any) {
        console.error("Webhook Error:", error.message || error);
        return NextResponse.json(
            { error: "Webhook processing failed", details: error.message },
            { status: 500 }
        );
    }
}
