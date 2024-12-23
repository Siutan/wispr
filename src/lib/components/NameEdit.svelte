<script lang="ts">
  import { pb } from "$lib/pocketbase";
  import { recordDetails, selectedRecord } from "$lib/stores/recordStore";
  import { mapRecordDetails, type RecordDetails } from "$lib/types/record";
  import { debounce } from "$lib/utils";

  interface Props {
    recordName: string;
  }

  let { recordName = $bindable() }: Props = $props();

  let editing = false;
  let loading = $state(false);
  let errorMessage: string = $state();
  let previousName = recordName;


  // debounce input
  function handleInput() {
    editing = true;
    if (recordName === previousName) {
      return;
    }
    if (recordName.trim() === "") {
      errorMessage = "Name cannot be empty";
      return;
    }
    if (recordName.length > 50) {
      errorMessage = "Name cannot be more than 50 characters";
      return;
    }
    errorMessage = "";
    debounce(1000, saveName)();
  }

  async function saveName() {
    if (editing) {
      loading = true;
      const request: RecordDetails = await pb.collection("content")
        .update($selectedRecord, { name: recordName }, {
          expand: "category"
        });
      recordDetails.set(mapRecordDetails(request));
    }
    editing = false;
    loading = false;
    previousName = recordName;
  }
</script>

<div class="w-full flex gap-2 justify-between">
  <input
    class="w-full text-2xl text-primary font-bold bg-transparent border-transparent focus:border-transparent focus:ring-0"
    bind:value={recordName}
    onkeyup={handleInput}
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