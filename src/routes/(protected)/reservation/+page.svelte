<script>
	import { page } from '$app/stores'
	async function updateServerOrder(userId) {
		try {
			await fetch('../../api/get-reservation', {
				method: 'POST',
				body: userId,
			});
		} catch (error) {
			console.error('Failed to update server order:', error);
		}
	}
</script>
<main>
	<h1>Welcome {$page.data.user.name} your ID is {$page.data.user.id}!</h1>
</main>