<script lang="ts">
	import { enhance } from '$app/forms'
	import { page } from '$app/stores'

	import '../styles/app.css'
</script>

<svelte:head>
	<title>SvelteKit Auth</title>
</svelte:head>

<nav>
	{#if !$page.data.user}
		<a href="/login">Login</a>
		<a href="/register">Register</a>
	{/if}

	{#if $page.data.user}
		<a href="/">Home</a>
		<a href="/admin">Admin</a>
		<a href="/order">Order</a>
		<a href="/checkout">Checkout</a>
		<a href="/menu">Menu</a>


		<form class="logout" action="/logout" method="POST" use:enhance>
			<button type="submit">Log out</button>
		</form>
	{/if}
</nav>

<main>
	<slot />
</main>
