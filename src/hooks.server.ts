import type { Handle } from '@sveltejs/kit';
import { db } from '$lib/server/database';

export const handle: Handle = async ({ event, resolve }) => {
	const session = event.cookies.get('session');

	if (!session) {
		return await resolve(event);
	}

	const user = await db.user.findUnique({
		where: { userAuthToken: session },
		select: {
			username: true,
			role: true,
			id: true,
			orders: {
				select: {
					orderedItems: true,
				},
			},
		},
	});

	if (user) {
		event.locals.user = {
			name: user.username,
			role: user.role.name,
			id: user.id,
			orders: user.orders.map(order => order.orderedItems), // Extract orderedItems from each update-order
		};
	}

	return await resolve(event);
};
