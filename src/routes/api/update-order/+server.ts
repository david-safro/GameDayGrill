import { json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(event) {
	try {
		const data = await event.request.formData();
		const listItems = data.getAll('listItem');
		const userId = data.get('userId');

		const user = await prisma.user.findUnique({
			where: { id: userId },
			include: { orders: true },
		});

		if (!user) {
			throw new Error('User not found');
		}

		const existingOrder = user.orders.find(order => order.userId === userId);

		if (existingOrder) {
			await prisma.order.update({
				where: { userId: existingOrder.userId },
				data: {
					orderedItems: listItems.join(', '),
				},
			});

			console.log('Updated order for user:', user);
		} else {
			throw new Error('Existing order not found');
		}

		return new Response(JSON.stringify({ message: 'Order updated successfully' }), {
			headers: {
				'Content-Type': 'application/json',
			},
		});
	} catch (error) {
		console.error('Failed to update order:', error);
		return new Response(JSON.stringify({ error: 'Failed to update order' }), {
			status: 500, // Internal Server Error
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}
}
