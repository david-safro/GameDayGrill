<!-- src/routes/menu/Menu.svelte -->

<script context="module" lang="ts">
	import jsonData from "../../../menu/menu";
	console.log("menu:", jsonData); // Log the menu data
</script>

<main>
	{#if jsonData}
		<div class="menu-container">
			{#each Object.entries(jsonData) as [category, items]}
				<section>
					<h2>{category}</h2>
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
						{#if items && !items.subcategories}
							{#each Object.entries(items) as [itemName, item]}
								<tr>
									<td>{itemName}</td> <!-- Log itemName -->
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
										<td>{subItemName}</td> <!-- Log subItemName -->
										<td>{subItem.price}</td>
										<td>{subItem.description}</td>
										<td>{subItem.ingredients ? subItem.ingredients.join(", ") : 'N/A'}</td>
										<td><button on:click={() => handleAddItem(subItem)}>Add</button></td>
									</tr>
								{/each}
							{/each}
              {/if}
            </tbody>
          </table>
        </section>
      {/each}
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

  table {
    width: 100%;
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

<script>
  function handleAddItem(item) {
    // Add your logic to handle adding the item
    console.log("Adding item:", item);
  }
</script>
