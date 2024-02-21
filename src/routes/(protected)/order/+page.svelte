<script lang="ts">
	import { onMount } from "svelte";
	import OrderMenu from "../../../components/OrderMenu.svelte";
	import { page } from "$app/stores";
	import { menu } from "$lib/menu";

	export let menuData: any[] = [];
	export let price = 0;
	export let data;

	onMount(() => {
		// Extract food names from data.current_order and split them
		const foodNames = data.current_order[0].split(',');

		// Search through the menu for each food item and print out the JSON objects
		foodNames.forEach(foodName => {
			const foundFood = findFoodByName(foodName.trim()); // Trim to remove leading/trailing spaces
			if (foundFood) {
				console.log("Found Food:", foundFood);
			} else {
				console.warn(`Food '${foodName}' not found in the menu.`);
			}
		});

		const cart = document.getElementsByClassName("cart")[0];
		document.addEventListener("click", () => {
			const parsedData = JSON.parse(cart.getAttribute("data-ordered")!) || [];
			menuData = Array.isArray(parsedData) ? parsedData : [parsedData];
			price = menuData.reduce((partialSum: number, i: any) => partialSum + i.price, 0).toFixed(2);
		});
	});

	// Function to find a food item in the menu by name
	function findFoodByName(foodName: string) {
		for (const category in menu) {
			const foundFood = menu[category].find(food => food.name === foodName);
			if (foundFood) {
				return foundFood;
			}
		}
		return null;
	}

	async function sendOrder() {
		const userId = $page.data.user.id;

		const response = await fetch('/api/update-order', {
			method: 'POST',
			body: JSON.stringify({ userId, menuData }),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		console.log(await response.json());
	}
</script>

<link rel="stylesheet" href="/css/delivery.css"/>
<OrderMenu></OrderMenu>
<div id="right">
	<section>
		<span id="price">Total: ${price}</span>
		<br>
		<form method="post" action={`/checkout`}>
			<input name="menuData" id="menuData" bind:value={menuData} hidden={true}/>
			<button type="submit" class="btn-2">Order</button>
			<button type="button" class="btn-2" on:click={sendOrder}>Send Order</button>
		</form>
	</section>
</div>
