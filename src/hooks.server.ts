import type { Handle } from '@sveltejs/kit';
import { db } from '$lib/server/database';

export const handle: Handle = async ({ event, resolve }) => {
	const session = event.cookies.get('session');

	if (!session) {
		return await resolve(event);
	}

	const user = await db.user.findUnique({
		where: { userAuthToken: session },
		select: { username: true, role: true, id: true, orders: true },
	});

	if (user) {
		const order = await db.order.findFirst({
			where: { userId: user.id },
			select: { userId: true, orderedItems: true },
		});

		event.locals.user = {
			name: user.username,
			role: user.role.name,
			id: user.id,
			order: order,
		};
	}

	return await resolve(event);
};
