<script lang="ts">
  import { menu } from "$lib/menu";

  export let order = true;

  interface MenuItem {
    name: string;
    price: number;
    desc: string;
    info: number;
  };

  export let cartItems: Array<MenuItem> = [];

  function addToCart(item: MenuItem) {
    cartItems = [...cartItems, item];
    document.getElementsByClassName("cart")[0].setAttribute("data-ordered", JSON.stringify(cartItems));
  }

  function removeFromCart(index: number) {
    cartItems = cartItems.filter((_, i) => i !== index);
    document.getElementsByClassName("cart")[0].setAttribute("data-ordered", JSON.stringify(cartItems));
  }
</script>

<link href="/css/ordermenu.css" rel="stylesheet" />
<section class="order-menu {order ? '' : 'menu'}">
  {#each Object.entries(menu) as [category, items]}
    <h1 class="menu-head">{category}</h1>
    <ul>
      {#each items as item}
        <li class="drk-bdr">
          <h3>{item.name}</h3>
          <p>{item.desc}</p>
          <span>${item.price}</span>
          {#if order}
            <button on:click={() => addToCart(item)} class="btn-2">Add</button>
          {/if}
      </li>
      {/each}
    </ul>
  {/each}
</section>
{#if order}
<section class="cart" data-ordered="{{}}">
  <ul>
    {#each cartItems as cartItem, index}
    <li class="drk-bdr">
      <h3>{cartItem.name}</h3>
      <span>${cartItem.price}</span>
      <button on:click={() => removeFromCart(index)} class="btn-2">Remove</button>
    </li>
    {/each}
  </ul>
</section>
{/if}