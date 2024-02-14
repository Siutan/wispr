<script lang="ts">
  import { recordDetails, selectedRecord } from "$lib/stores/recordStore";
  import { pb } from "$lib/pocketbase";
  import { mapRecordDetails, type RecordDetails } from "$lib/types/record";
  import { debounce } from "$lib/utils";

  export let currentExpiry: string;
  let extendToggle = false;
  let durationInput = ""; // Default value
  let errorMessage = "";
  let loading = false;

  $: isExpired = new Date(currentExpiry) < new Date();

  function toggleExtend() {
    extendToggle = !extendToggle;
    if (!extendToggle) {
      durationInput = ""; // Reset to default when toggle is off
    }
  }

  function setDuration(duration: string) {
    durationInput = duration;
    validateInput();
  }

  function validateInput() {
    const regex = /^(\d+)([mdh])$/;
    const match = durationInput.match(regex);
    if (match) {
      const value = parseInt(match[1]);
      const unit = match[2];
      switch (unit) {
        case "m":
          if (value > 59) {
            errorMessage = "Minutes cannot exceed 59.";
            return;
          }
          break;
        case "h":
          if (value > 23) {
            errorMessage = "Hours cannot exceed 23.";
            return;
          }
          break;
        case "d":
          if (value > 7) {
            errorMessage = "Days cannot exceed 7.";
            return;
          }
          break;
      }
      // Clear error if input is valid
      errorMessage = "";
      debounce(1000, updateExpiry)();
    } else {
      errorMessage = "Invalid input format.";
    }
  }

  async function updateExpiry() {
    if (errorMessage) return;
    if (!durationInput) return;
    loading = true;
    if (!parseDuration()) return;
    const expiry = new Date(new Date().getTime() + parseDuration() * 1000);
    const request: RecordDetails = await pb.collection("content")
      .update($selectedRecord, { expiry }, { expand: "category" });
    const formattedData = mapRecordDetails(request);
    recordDetails.set(formattedData);
    currentExpiry = formattedData.expiry;
    loading = false;
  }

  function parseDuration(): number | null {
    if (errorMessage) return null;
    if (!durationInput) return null;
    const regex = /^(\d+)([mdh])$/;
    const match = durationInput.match(regex);
    if (match) {
      const value = parseInt(match[1]);
      const unit = match[2];
      switch (unit) {
        case "m":
          return value * 60;
        case "h":
          return value * 3600;
        case "d":
          return value * 86400;
      }
    }
    return null;
  }

  // convert expiry to local time
  $: localExpiry = new Date(currentExpiry).toLocaleString();
</script>

<div class="flex flex-col gap-2">
  {#if isExpired}
    <p class="badge badge-outline badge-warning py-3">Expired on: {localExpiry}</p>
    <p class="font-semibold">Set new expiry:</p>
    <div class="flex gap-2">
      <button class="btn btn-outline btn-primary" on:click={() => setDuration("15m")}>15 Min</button>
      <button class="btn btn-outline btn-primary" on:click={() => setDuration("1h")}>1 Hour</button>
      <button class="btn btn-outline btn-primary" on:click={() => setDuration("1d")}>1 Day</button>
      <button class="btn btn-outline btn-primary" on:click={() => setDuration("7d")}>1 Week</button>
      <button class="btn" on:click={toggleExtend}>Custom</button>
      {#if loading}
        <div class="flex items-center justify-center">
          <span class="loading loading-infinity loading-lg"></span>
        </div>
      {/if}
    </div>
    {#if extendToggle}
      <input type="text" class="input w-fit {errorMessage ? 'input-error' : ''}" bind:value={durationInput} placeholder="e.g., 30m, 2h, 3d" on:input={validateInput}>
      {#if errorMessage}
        <p class="text-error">{errorMessage}</p>
      {/if}
    {/if}
  {:else}
    <p class="badge badge-outline badge-primary py-3">Expires on: {localExpiry}</p>
    <p class="label font-bold text-sm">Extend duration:</p>
    <input name="extendCheckbox" type="checkbox" class="toggle" checked={extendToggle} on:change={toggleExtend}>
    {#if extendToggle}
      <div class="flex gap-2">
        <button class="btn btn-outline btn-primary" on:click={() => setDuration("15m")}>15 Min</button>
        <button class="btn btn-outline btn-primary" on:click={() => setDuration("1h")}>1 Hour</button>
        <button class="btn btn-outline btn-primary" on:click={() => setDuration("1d")}>1 Day</button>
        <button class="btn btn-outline btn-primary" on:click={() => setDuration("7d")}>1 Week</button>
        {#if loading}
          <div class="flex items-center justify-center">
            <span class="loading loading-infinity loading-lg"></span>
          </div>
        {/if}
      </div>
      {#if errorMessage}
        <p class="text-error">{errorMessage}</p>
      {/if}
    {/if}
  {/if}
</div>


