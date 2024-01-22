// Import necessary modules and dependencies
import { json, ServerFunction } from '@sveltejs/kit/node';
import { PrismaClient } from '@prisma/client';

// Create an instance of PrismaClient
const prisma = new PrismaClient();

// Define the API endpoint for updating the user's order
export const post: ServerFunction = async (request) => {
	try {
		// Extract data from the request body
		const { userId, itemName } = json(request.body);

		// Retrieve the user by userId
		const user = await prisma.user.findUnique({
			where: { id: userId },
			include: { orders: true },
		});

		if (!user) {
			return {
				status: 404,
				body: { message: 'User not found' },
			};
		}

		// Get the user's current order or create a new one
		const order = user.orders[0] || await prisma.order.create({
			data: { userId: user.id },
		});

		// Update the orderedItems field in the order
		await prisma.order.update({
			where: { userId: user.id },
			data: { orderedItems: order.orderedItems ? `${order.orderedItems}, ${itemName}` : itemName },
		});

		return {
			status: 200,
			body: { message: 'Order updated successfully' },
		};
	} catch (error) {
		console.error('Error updating order:', error);
		return {
			status: 500,
			body: { message: 'Internal server error' },
		};
	} finally {
		// Close the Prisma client connection
		await prisma.$disconnect();
	}
};
