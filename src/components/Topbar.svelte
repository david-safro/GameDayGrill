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
        {#if $page.data.user == null}
            <button on:click={() => {document.location.href = "/login"}} class="btn-3">Login</button>
            <button on:click={() => {document.location.href = "/register"}} class="btn-2">Sign Up</button>
        {:else}
        <form class="logout" action="/logout" method="POST">
            <span>Welcome, {$page.data.user.name}</span>
			<button class="btn-2 coolbtn" type="submit">Log out</button>
		</form>
        {/if}
        </div>

        

        
    </div>
    <nav>
        <a on:click={() => {document.location.href = "/"}} class={route == "/" ? "visiting" : ""}><span>Home</span></a>
        <a on:click={() => {document.location.href = "/menu"}} class={route == "/menu" ? "visiting" : ""}><span>Menu</span></a>
        <a on:click={() => {document.location.href = "/order"}} class={route == "/order" ? "visiting" : ""}><span>Order</span></a>
        <a on:click={() => {document.location.href = "/reserve"}} class={route == "/reserve" ? "visiting" : ""}><span>Reserve</span></a>
    </nav>
</header>