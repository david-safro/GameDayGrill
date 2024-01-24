<script>
	import { onMount } from "svelte";

	// Function to handle button click and redirect
	const handleButtonClick = (destination) => {
		window.location.href = destination;
	};

	// Function to handle keyboard events
	const handleKeyPress = (event, destination) => {
		if (event.key === "Enter") {
			handleButtonClick(destination);
		}
	};

	// Listen for keyboard events
	onMount(() => {
		document.addEventListener("keydown", (event) =>
			handleKeyPress(event, "/delivery")
		);
	});
</script>

<style>
    button {
        margin: 10px;
        padding: 10px;
        font-size: 16px;
    }
</style>

<main>
	<h1>Select an Option:</h1>
	<button on:click={() => handleButtonClick("/delivery")}>
		Delivery
	</button>
	<button on:click={() => handleButtonClick("/takeout")}>
		Takeout
	</button>
</main>
