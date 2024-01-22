<script context="module" lang="ts">
	import jsonData from "../../../menu/menu";
</script>
<script>
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { page } from '$app/stores';
	export let data
	let listItems = writable([]);
	let currentListItems;

	listItems.subscribe(value => {
		currentListItems = value;
	});

	// Function to update the server with the new order
	async function updateServerOrder(newList, userId) {
		try {
			const formData = new FormData();
			newList.forEach(item => {
				formData.append('listItem', item);
			});
			formData.append('userId', userId);

			await fetch('../../api/update-order', {
				method: 'POST',
				body: formData,
			});
		} catch (error) {
			console.error('Failed to update server order:', error);
		}
	}

	function handleAddItem(item) {
		console.log('Adding item:', item);
		listItems.update(items => [...items, item.name]);

		// Update the server with the new order
		updateServerOrder(currentListItems, $page.data.user.id);
	}

</script>
<main>
	{#if jsonData}
		<h1>Welcome {$page.data.user.name} your ID is {$page.data.user.id}!</h1>
		<div class="menu-container">
			<section>
				<h2>Menu</h2>
				<div class="tables-container">
					<!-- Left Table: Menu -->
					<table>
						<thead>
						<tr>
							<th>Name</th>
							<th>Price</th>
							<th>Description</th>
							<th>Ingredients</th>
							<th>Add Item</th>
						</tr>
						</thead>
						<tbody>
						{#each Object.entries(jsonData) as [category, items]}
							<tr>
								<td colspan="5" class="subcategory">{category}</td>
							</tr>
							{#if items && !items.subcategories}
								{#each Object.entries(items) as [itemName, item]}
									<tr>
										<td>{item.name}</td>
										<td>{item.price}</td>
										<td>{item.description}</td>
										<td>{item.ingredients ? item.ingredients.join(", ") : 'N/A'}</td>
										<td><button on:click={() => handleAddItem(item)}>Add</button></td>
									</tr>
								{/each}
							{/if}
							{#if items && items.subcategories}
								{#each Object.entries(items.subcategories) as [subcategory, subItems]}
									<tr>
										<td colspan="5" class="subcategory">{subcategory}</td>
									</tr>
									{#each Object.entries(subItems) as [subItemName, subItem]}
										<tr>
											<td>{subItemName}</td>
											<td>{subItem.price}</td>
											<td>{subItem.description}</td>
											<td>{subItem.ingredients ? subItem.ingredients.join(", ") : 'N/A'}</td>
											<td><button on:click={() => handleAddItem(subItem)}>Add</button></td>
										</tr>
									{/each}
								{/each}
							{/if}
						{/each}
						</tbody>
					</table>

					<h1>Current Ordered Items:</h1>
					{#if $listItems.length > 0}
						<ul>
							{#each $listItems as listItem}
								<li>{listItem}</li>
							{/each}
						</ul>
					{:else}
						<p>No ordered items</p>
					{/if}
				</div>
			</section>
		</div>
	{/if}
</main>

<style>
    main {
        display: flex;
        height: 100vh;
        background-color: #222;
        color: #fff;
    }

    .menu-container {
        max-width: 50vw;
        overflow-y: auto;
        border-radius: 10px;
        background-color: #333;
        padding: 20px;
        font-family: 'Arial', sans-serif;
    }

    .tables-container {
        display: flex;
    }

    table {
        width: 50%;
        border-collapse: collapse;
        margin-top: 10px;
    }

    th, td {
        border: 1px solid #555;
        padding: 8px;
        text-align: left;
    }

    th {
        background-color: #4CAF50;
        color: white;
    }

    .subcategory {
        font-weight: bold;
        padding-left: 20px;
    }

    button {
        background-color: #008CBA;
        color: white;
        border: none;
        padding: 5px 10px;
        border-radius: 5px;
        cursor: pointer;
    }

    button:hover {
        background-color: #00506b;
    }
</style>

