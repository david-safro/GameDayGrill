<script lang="ts">


 import { DateInput } from 'date-picker-svelte'
        let date = new Date()
  
  </script>
  <link rel="stylesheet" href="/css/reserve.css"/>

  <div id="main-area">
    <span class="header-text">Current Reservations</span>
    <div>

    </div>
    <span class="header-text">Make Reservation</span>
<div>
    <form action="/" method="post">
        <DateInput bind:value={date} min={new Date()} timePrecision={'minute'}/>
        <input type="text" hidden={true} name="datetime" id="datetime" bind:value={date}/>
        <label for="nPeople">Number of People</label>
        <input type="number" name="nPeople" id="nPeople" min="1" max="8"/>
        <button type="submit">Create Reservation</button>
    </form>
</div>
    </div>
  