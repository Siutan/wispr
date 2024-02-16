<script lang="ts">
  import { pb } from "$lib/pocketbase";
  import { recordList, newRecord } from "$lib/stores/recordStore";
  import { mapRecordDetails } from "$lib/types/record";

  let loading = false;

  async function addNew() {
    loading = true;
    const record = await pb.collection("content").create(newRecord, { expand: "category" });
    recordList.update((records) => {
      // push to front of array
      records.unshift(mapRecordDetails(record));
      loading = false;
      return records;
    });
  }
</script>

<button class="btn btn-primary btn-md" on:click={addNew} disabled={loading}>
  {#if loading}
    <div class="flex items-center justify-center w-full h-full">
      <span class="loading loading-infinity loading-lg"></span>
    </div>
  {:else}
    Add New
  {/if}
</button>