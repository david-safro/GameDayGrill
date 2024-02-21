// create-reservation/+server.ts

import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { userId, name, email, numberOfPeople, selectedDate, duration } = await request.json();

		if (!userId) {
			throw new Error('Invalid payload structure: Missing userId');
		}

		// Assuming 'User' and 'Reservation' models are available in Prisma
		const reservation = await prisma.reservation.create({
			data: {
				name,
				numberOfPeople,
				selectedDate,
				duration,
				userId,
			},
		});

		console.log('Reservation created:', reservation);

		return json("success");
	} catch (error) {
		console.error('Error processing order:', error);
		return json({ error: 'Invalid request payload' }, 400);
	}
};
