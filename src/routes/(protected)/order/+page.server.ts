import type { PageServerLoad } from './$types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const load: PageServerLoad = async ({ params }) => {
	const { id } = params;

	try {
		const userOrders = await prisma.order.findMany({
			where: { userId: id },
			select: { orderedItems: true },
		});

		return {
			current_order: userOrders.map(order => order.orderedItems),
		}
	} catch (error) {
		return {
			status: 500,
			error,
		};
	} finally {
		await prisma.$disconnect();
	}
};