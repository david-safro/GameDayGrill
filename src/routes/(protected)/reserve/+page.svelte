<script>
  import { onMount, afterUpdate } from 'svelte';
  import { readable, writable } from 'svelte/store';
  import { page } from "$app/stores";

  let name = '';
  let email = '';
  let numberOfPeople = 2;
  let selectedDate = new Date().toISOString();
  let duration = 1;

  async function handleSubmit() {
    const response = await fetch('/api/create-reservation', {
      method: 'POST',
      body: JSON.stringify({ userId: $page.data.user.id, name, email, numberOfPeople, selectedDate, duration }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('Reservation submitted:', { name, email, numberOfPeople, selectedDate, duration });

    console.log(await response.json());
  };

  const isDateValid = () => {
    const fourMonthsAhead = new Date();
    fourMonthsAhead.setMonth(fourMonthsAhead.getMonth() + 4);
    return selectedDate <= fourMonthsAhead;
  };

  // Reactive store for subtotal
  const subtotal = writable(calculateSubtotal());

  function calculateSubtotal() {
    const extraPeopleCost = Math.floor(numberOfPeople / 5) * 10;
    const durationCost = (duration - 1) * 20;
    return extraPeopleCost + durationCost;
  }


  $: {
    subtotal.set(calculateSubtotal());
  }
</script>

<style>
  #reservationForm {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    width: 300px; /* Adjust width as needed */
  }

  .form-field {
    margin-bottom: 16px;
    width: 100%;
  }

  .submit-button {
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .subtotal-field {
    font-weight: bold;
    margin-top: 10px;
  }
</style>

<form id="reservationForm" on:submit|preventDefault={handleSubmit} method="post" action={`/order/${$page.data.user.id}`}>
  <label for="name" class="form-field">Name:</label>
  <input type="text" id="name" class="form-field" bind:value={name} required />

  <label for="email" class="form-field">Email:</label>
  <input type="email" id="email" class="form-field" bind:value={email} required />

  <label for="numberOfPeople" class="form-field">Number of People (min 2):</label>
  <input type="number" id="numberOfPeople" class="form-field" bind:value={numberOfPeople} min="2" required />

  <label for="selectedDate" class="form-field">Date and Time:</label>
  <input type="datetime-local" id="selectedDate" class="form-field" bind:value={selectedDate} required />
  {#if !isDateValid()}
    <p style="color: red; margin-bottom: 0;">Booking more than 4 months in advance is not allowed.</p>
  {/if}

  <label for="duration" class="form-field">Meeting Duration (1-5 hours):</label>
  <select id="duration" class="form-field" bind:value={duration} required>
    {#each Array.from({ length: 5 }, (_, i) => i + 1) as hour}
      <option value={hour}>{hour} hour{hour > 1 ? 's' : ''}</option>
    {/each}
  </select>

  <button type="submit" class="submit-button">Make Reservation</button>

  <p class="subtotal-field">Reservation Subtotal: ${$subtotal}</p>
</form>

<div>
  <h1>Your Reservations</h1>
  <p>You have no reservations right now</p>
</div>