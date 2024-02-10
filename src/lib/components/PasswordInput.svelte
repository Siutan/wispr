<script lang="ts">
  import { mapRecordDetails, type RecordDetails } from "$lib/types/record";
  import { pb } from "$lib/pocketbase";
  import { recordDetails, selectedRecord } from "$lib/stores/recordStore";
  import { debounce } from "$lib/utils";

  export let password: string;

  let editing = false;
  let loading = false;
  let errorMessage = "";
  let previousPassword = password;

  function handleInput() {
    editing = true;
    if (password === previousPassword) {
      return;
    }
    if (password.trim() === "") {
      errorMessage = "Password must be at least 1 character long.";
      return;
    }
    errorMessage = "";
    debounce(1000, savePassword)();
  }

  async function savePassword() {
    if (editing) {
      loading = true;
      const request: RecordDetails = await pb.collection("content")
        .update($selectedRecord, { password: password }, {
          expand: "category"
        });
      recordDetails.set(mapRecordDetails(request));
    }
    editing = false;
    loading = false;
    previousPassword = password;
  }
</script>


<div class="flex gap-4 w-full">
  <input
    type="password"
    class="w-1/2 input input-primary"
    bind:value={password}
    on:keyup={handleInput}
  />
  {#if loading}
    <div class="flex items-center justify-center">
      <span class="loading loading-infinity loading-lg"></span>
    </div>
  {/if}
</div>
{#if errorMessage}
  <p class="text-error">{errorMessage}</p>
{/if}