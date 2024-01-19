// +page.server.ts
import { db } from '$lib/server/database';

export async function updateOrder(userId: string, orderedItems: string) {
	await db.order.update({
		where: { userId },
		data: { orderedItems },
	});
}
