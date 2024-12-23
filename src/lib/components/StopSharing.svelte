<script lang="ts">
  import { run } from 'svelte/legacy';

  import { pb } from "$lib/pocketbase";
  import { recordDetails, selectedRecord } from "$lib/stores/recordStore";
  import { mapRecordDetails } from "$lib/types/record";

  interface Props {
    expiry: string;
  }

  let { expiry = $bindable() }: Props = $props();
  let isExpired = $state(new Date(expiry) < new Date());

  let loading = $state(false);
  async function stopSharing() {
    if (isExpired) return;
    loading = true;
    const request = await pb.collection("content")
      .update($selectedRecord, { expiry: new Date() }, { expand: "category" });
    const formattedData = mapRecordDetails(request);
    recordDetails.set(formattedData);
    expiry = formattedData.expiry;
    loading = false;
  }

  run(() => {
    isExpired = new Date(expiry) < new Date();
  });
</script>

<button class="btn btn-sm sm:btn-md {isExpired ? 'btn-info btn-outline hover:cursor-context-menu' : 'btn-error'}" onclick={stopSharing} disabled={loading}>
  {#if loading}
    <span class="loading loading-sm text-error"></span> Loading...
  {:else}
    {isExpired ? "Stopped" : "Stop Sharing"}
  {/if}
</button>