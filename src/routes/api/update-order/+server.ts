import { json, type RequestHandler } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { userId, menuData } = await request.json();

		// Fetch the user
		const user = await prisma.user.findUnique({
			where: { id: userId },
			include: { orders: true },
		});

		if (!user) {
			return json({ error: 'User not found' }, 404);
		}

		// Combine names from the array of JSONs into a single string separated by commas
		const orderedItems = menuData.map((item: any) => item.name).join(', ');

		// Update or create the user's order
		await prisma.order.upsert({
			where: { userId },
			update: { orderedItems },
			create: { userId, orderedItems },
		});

		console.log(`User ${userId}'s order updated successfully with items: ${orderedItems}`);

		// Process the order or perform any necessary actions

		return json({ status: 'Order received and user updated successfully!' });
	} catch (error) {
		console.error('Error processing order:', error);
		return json({ error: 'Invalid request payload' }, 400);
	} finally {
		await prisma.$disconnect(); // Close the Prisma client connection
	}
};
