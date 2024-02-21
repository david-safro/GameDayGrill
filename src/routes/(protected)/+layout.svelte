<script>
// @ts-nocheck

    import { page } from '$app/stores';
    import { goto } from '$app/navigation';

    // Check if user data is defined
    $: user = $page.data.user;

    // Function to handle redirection to /login
    function redirectToLogin() {
      if(!user){
      goto('/login');
      }
    }
  </script>

  <div use:redirectToLogin>
    <slot />
  </div>
