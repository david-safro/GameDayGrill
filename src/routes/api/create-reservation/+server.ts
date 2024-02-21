// create-reservation/+server.ts

import { json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';

const prisma = new PrismaClient();

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { userId, name, numberOfPeople, selectedDate, duration } = await request.json();

		if (!userId || !selectedDate) {
			throw new Error('Invalid payload structure: Missing userId or selectedDate');
		}

		// Convert selectedDate to ISO-8601 format
		const isoSelectedDate = new Date(selectedDate).toISOString();

		// Assuming 'User' and 'Reservation' models are available in Prisma
		const reservation = await prisma.reservation.create({
			data: {
				name,
				numberOfPeople,
				selectedDate: isoSelectedDate,
				duration,
				userId,
			},
		});

		console.log('Reservation created:', reservation);

		return json({ success: true });
	} catch (error) {
		console.error('Error processing reservation:', error);
		return json({ error: 'Invalid request payload' }, 400);
	} finally {
		await prisma.$disconnect(); // Close Prisma instance after usage
	}
};

