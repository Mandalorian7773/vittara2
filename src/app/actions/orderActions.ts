'use server';

import dbConnect from '@/lib/db';
import Order from '@/models/Order';

export async function getOrders() {
    try {
        await dbConnect();
        const orders = await Order.find({}).sort({ createdAt: -1 });

        // Serialize the Mongoose documents to plain objects
        return JSON.parse(JSON.stringify(orders));
    } catch (error) {
        console.error('Error fetching orders:', error);
        return [];
    }
}

export async function verifyPasscode(passcode: string) {
    return passcode === process.env.ADMIN_PASSCODE;
}
