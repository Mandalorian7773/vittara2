import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import prisma from "@/lib/prisma";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_1234567890", // Fallback for dev/build
  key_secret: process.env.RAZORPAY_KEY_SECRET || "fallback_secret",
});

export async function POST(req: NextRequest) {
  try {
    const { amount, currency, customerDetails, items } = await req.json();

    const options = {
      amount: amount * 100, // amount in smallest currency unit
      currency: currency,
      receipt: "receipt_" + Math.random().toString(36).substring(7),
    };

    const razorpayOrder = await razorpay.orders.create(options);

    // Create Order in Postgres via Prisma
    const newOrder = await prisma.order.create({
      data: {
        customerName: customerDetails.name,
        address: customerDetails.address, // Stored as Json
        amount: amount,
        currency: currency,
        razorpayOrderId: razorpayOrder.id,
        status: 'pending',
        items: items // Stored as Json
      }
    });

    return NextResponse.json({
      ...razorpayOrder,
      dbOrderId: newOrder.id
    });
  } catch (error: any) {
    console.error("Razorpay/DB Error:", error);
    return NextResponse.json(
      {
        error: "Error creating order",
        details: error.message || error.toString(),
      },
      { status: 500 }
    );
  }
}
