<script lang="ts">
	async function subscribe(event: Event) {
		const form = event.target as HTMLFormElement;
		const data = new FormData(form);

		try {
			const response = await fetch('/api/update-order', {
				method: 'POST',
				body: data,
			});

			const result = await response.json();

			// Display the result message in the h3 element
			const messageElement = document.getElementById('subscription-message');
			if (messageElement) {
				messageElement.innerText = result.message || result.error || 'Unknown error';
			}
		} catch (error) {
			console.error('Subscription failed:', error);
		}
	}
</script>

<h1>Newsletter</h1>

<form on:submit|preventDefault={subscribe}>
	<input type="email" name="email" />
	<button>Subscribe</button>
</form>

<h3 id="subscription-message"></h3>
