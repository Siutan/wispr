<script lang="ts">
  import { selectedRecord, recordDetails } from "$lib/stores/recordStore";
  import { pb } from "$lib/pocketbase";
  import { mapRecordDetails, type RecordDetails } from "$lib/types/record";

  export let type = "password" || "markdown";

  let loading = false;

  async function updateType() {
    loading = true;
    const request: RecordDetails = await pb.collection("content")
      .update($selectedRecord, { type: type }, { expand: "category" });
    recordDetails.set(mapRecordDetails(request));
    loading = false;
  }

</script>

<div class="flex gap-2">
  <select class="select" bind:value={type} on:change={updateType}>
    <option value="password">Password</option>
    <option value="markdown">Markdown</option>
  </select>

  {#if loading}
    <div class="flex items-center justify-center w-full h-full">
      <span class="loading loading-infinity loading-lg"></span>
    </div>
  {/if}
</div>

