<script>
    import { page } from "$app/stores";
	import { redirect } from "@sveltejs/kit"
    import { onMount } from "svelte";
  
    onMount(() => {
      if ($page.data.user == null) {
        document.location.href = "/login";
      }
    });
  </script>
  
  <slot />
  