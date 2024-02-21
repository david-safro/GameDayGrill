<script lang="ts">
     import { page } from '$app/stores'  
     export const route = $page.url.pathname  
     console.log(route)
</script>

<link href="/css/topbar.css" rel="stylesheet"/>
<header class="topbar">
    <div>
        <img src="/img/logo.png"/>
        <div>
            <button on:click={() => {document.location.href = "/login"}} class="btn-3">Login</button>
            <button on:click={() => {document.location.href = "/signup"}} class="btn-2">Sign Up</button>
        </div>
    </div>
    <nav>
        <a on:click={() => {document.location.href = "/"}} class={route == "/" ? "visiting" : ""}><span>Home</span></a>
        <a on:click={() => {document.location.href = "/menu"}} class={route == "/menu" ? "visiting" : ""}><span>Menu</span></a>
        <a on:click={() => {document.location.href = "/pickup"}} class={route == "/pickup" ? "visiting" : ""}><span>Pickup</span></a>
        <a on:click={() => {document.location.href = "/delivery"}} class={route == "/delivery" ? "visiting" : ""}><span>Delivery</span></a>
        <a on:click={() => {document.location.href = "/reserve"}} class={route == "/reserve" ? "visiting" : ""}><span>Reserve</span></a>
    </nav>
</header>