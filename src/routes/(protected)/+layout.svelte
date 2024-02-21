<script>
    
    import { goto } from '$app/navigation';
	import { page } from '$app/stores'
  
    // Check if user data is defined
    $: user = $page.data.user;
  
    // Redirect to /login if user data is not defined
    if (!$page.data.user) {
      goto('/login');
    }
  </script>
  
  <slot />
  