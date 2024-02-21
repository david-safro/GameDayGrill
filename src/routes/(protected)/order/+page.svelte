<script lang="ts">
  import { onMount } from "svelte";
  import OrderMenu from "../../../components/OrderMenu.svelte";
  import { page } from "$app/stores";
  import { menu } from "$lib/menu";

  export let menuData: any[] = [];
  export let price = 0;
  export let data;

  onMount(async () => {
    // Extract food names from data.current_order and split them
    const foodNames = data.current_order[0].split(',');

    // Iterate through food names and add foundFood to menuData
    foodNames.forEach(foodName => {
      const foundFood = findFoodByName(foodName.trim()); // Trim to remove leading/trailing spaces
      if (foundFood) {
        menuData.push(foundFood);
      } else {
        console.warn(`Food '${foodName}' not found in the menu.`);
      }
    });

    // Calculate the total price based on the updated menuData
    price = menuData.reduce((partialSum: number, item: any) => partialSum + item.price, 0).toFixed(2);
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
    <form>
      <label for="location">Location</label>
      <input type="text" id="location" name="location"/>
    </form>
    <div id="selected-items">
      {#each menuData as item (item.id)}
        <div class="selected-item">
          <span>{item.name}</span>
          <span>${item.price.toFixed(2)}</span>
        </div>
      {/each}
    </div>
    <span id="price">Total: ${price}</span>
    <br>
    <form method="post" action={`/checkout`}>
      <input name="menuData" id="menuData" bind:value={menuData}/>
      <button type="submit" class="btn-2">Order</button>
      <button type="button" class="btn-2" on:click={sendOrder}>Send Order</button>
    </form>
  </section>
</div>
