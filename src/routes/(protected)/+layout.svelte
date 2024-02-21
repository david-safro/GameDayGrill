<script>
// @ts-nocheck

    import { page } from '@sveltejs/kit';
    import { goto } from '$app/navigation';

    // Check if user data is defined
    $: user = $page.data.user;

    // Function to handle redirection to /login
    function redirectToLogin() {
      goto('/login');
    }
  </script>

  <div use:redirectToLogin>
    <slot />
  </div>
