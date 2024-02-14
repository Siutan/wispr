<script lang="ts">
  import { pb } from "$lib/pocketbase";
  import { recordDetails, selectedRecord } from "$lib/stores/recordStore";
  import { mapRecordDetails } from "$lib/types/record";

  let isExpired = new Date($recordDetails.expiry) < new Date();

  let loading = false;
  async function stopSharing() {
    loading = true;
    const request = await pb.collection("content")
      .update($selectedRecord, { expiry: new Date() }, { expand: "category" });
    const formattedData = mapRecordDetails(request);
    recordDetails.set(formattedData);
    loading = false;
  }

  $: isExpired = new Date($recordDetails.expiry) < new Date();
</script>

<button class="btn {isExpired ? 'btn-info' : 'btn-error'}" on:click={stopSharing} disabled={loading}>
  {#if loading}
    <span class="loading loading-sm"></span> Loading...
  {:else}
    {isExpired ? "Stopped" : "Stop Sharing"}
  {/if}
</button>