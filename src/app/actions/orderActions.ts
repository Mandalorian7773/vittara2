'use server';

import prisma from '@/lib/prisma';

export async function getOrders() {
    try {
        const orders = await prisma.order.findMany({
            orderBy: { createdAt: 'desc' }
        });

        return JSON.parse(JSON.stringify(orders));
    } catch (error) {
        console.error('Error fetching orders:', error);
        return [];
    }
}

export async function verifyPasscode(passcode: string) {
    const validPasscode = process.env.ADMIN_PASSCODE?.trim() || 'default_secure_passcode_if_not_set';
    return passcode.trim() === validPasscode;
}
