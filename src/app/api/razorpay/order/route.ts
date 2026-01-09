import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import dbConnect from "@/lib/db";
import Order from "@/models/Order";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_1234567890", // Fallback for dev/build
  key_secret: process.env.RAZORPAY_KEY_SECRET || "fallback_secret",
});

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { amount, currency, customerDetails, items } = await req.json();

    const options = {
      amount: amount * 100, // amount in smallest currency unit
      currency: currency,
      receipt: "receipt_" + Math.random().toString(36).substring(7),
    };

    const razorpayOrder = await razorpay.orders.create(options);

    // Create Order in MongoDB
    const newOrder = await Order.create({
      customerName: customerDetails.name,
      address: customerDetails.address,
      amount: amount,
      currency: currency,
      razorpayOrderId: razorpayOrder.id,
      status: 'pending',
      items: items // Assuming items are passed from frontend
    });

    return NextResponse.json({
      ...razorpayOrder,
      dbOrderId: newOrder._id
    });
  } catch (error: any) {
    console.error("Razorpay/DB Error:", error);
    // Return detailed error for debugging (remove in production if needed)
    return NextResponse.json(
      {
        error: "Error creating order",
        details: error.message || error.toString(),
        stack: error.stack
      },
      { status: 500 }
    );
  }
}
