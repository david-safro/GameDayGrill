<script lang="ts">
	import { onMount } from "svelte";
	import OrderMenu from "../../../components/OrderMenu.svelte";
	import { page } from "$app/stores"
  
	export let menuData: any;
	export let price = 0;
	onMount(() => {
	  const cart = document.getElementsByClassName("cart")[0];
	  document.addEventListener("click", () => {
		menuData = JSON.parse(cart.getAttribute("data-ordered")!)
		price = menuData.reduce((partialSum: number, i: any) => partialSum + i.price, 0).toFixed(2);
		menuData = JSON.stringify(menuData)
	  })
	})
	
  </script>
  <link rel="stylesheet" href="/css/delivery.css"/>
  <OrderMenu></OrderMenu>
  <div id="right">
	  <section>
		<form>
		  <label for="location">Location</label>
		  <input type="text" id="location" name="location"/>
		</form>
		<span id="price">Total: ${price}</span>
		<br>
		<form method="post" action="/{$page.data.user.id}">
		  <input name="menuData" id="menuData" bind:value={menuData}/>
		  <button type="submit" class="btn-2">Order</button>
		  </form>
	  </section>
  </div>
  