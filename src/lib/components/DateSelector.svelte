<script lang="ts">
  export let currentExpiry: string;
  let selectedNumber = 1;
  let timeUnit = "H";

  let extendToggle = false;

  $: isExpired = new Date(currentExpiry) < new Date();

  let numberOptions = range(1, 23);
  const timeUnitOptions = ["H", "D", "W"];

  function range(i, j) {
    return Array.from({ length: j - i + 1 }, (_, k) => k + i);
  }

  // Function to adjust the options in the first select box based on the selection in the second select box
  function adjustNumberOptions() {
    switch (timeUnit) {
      case "H":
        numberOptions = range(1, 23);
        break;
      case "D":
        numberOptions = range(1, 7);
        break;
      case "W":
        numberOptions = range(1, 4);
        break;
      default:
        numberOptions = [];
    }

    // Reset the selected number to the first option in the adjusted options
    selectedNumber = numberOptions[0];
  }
</script>

<div class="flex flex-col">
  {#if isExpired}
    <div class="flex gap-3 items-center">
      <select name="expirySelect" class="select select-primary" bind:value={selectedNumber}>
        {#each numberOptions as option}
          <option value={option}>{option}</option>
        {/each}
      </select>
      <select name="expiryLengthSelect" class="select select-primary" bind:value={timeUnit} on:change={adjustNumberOptions}>
        {#each timeUnitOptions as option}
          <option value={option}>{option}</option>
        {/each}
      </select>
    </div>
  {:else}
    <p class="badge badge-ghost py-3">Expires on: {currentExpiry}</p>
    <p class="label font-bold text-sm">Extend duration:</p>
    <input name="extendCheckbox" type="checkbox" class=" toggle" checked={extendToggle} on:change={() => {extendToggle = !extendToggle;}}>
    {#if extendToggle}
      <div class="flex gap-3 items-center">
        <select name="expirySelect" class="select select-primary" bind:value={selectedNumber}>
          {#each numberOptions as option}
            <option value={option}>{option}</option>
          {/each}
        </select>
        <p class="text-lg font-semibold">Hours</p>
      </div>
    {/if}
  {/if}

  <input hidden class="input" value={`${selectedNumber}${timeUnit}`} type="text" />
</div>