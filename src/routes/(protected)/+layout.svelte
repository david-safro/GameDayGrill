<script>
import { page } from "$app/stores"
if ($page.data.user == null) document.location.href = "/login"
</script>
<slot />