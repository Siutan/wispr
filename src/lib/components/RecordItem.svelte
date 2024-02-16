<script lang="ts">
  import { selectedRecord, recordDetails } from "$lib/stores/recordStore";
  import { getDate, isExpired } from "$lib/utils";
  import type { RecordDetails } from "$lib/types/record";
  import CopyLink from "$lib/components/CopyLink.svelte";
  import { menuStore } from "$lib/stores/menuStore";

  export let id: string;
  export let name: string;
  export let type: string;
  export let categoryName: string;
  export let categoryColour: string;
  export let expiry: string;

  function handleView() {
    selectedRecord.set(id);
    menuStore.set(false);
  }

  // Subscribe to the record details store and update the values when the id matches
  // this is to ensure that the values are updated when a change occurs
  recordDetails.subscribe((value: RecordDetails) => {
    if (value?.id === id) {
      name = value.name;
      type = value.type;
      categoryName = value.categoryName;
      categoryColour = value.categoryColor;
      expiry = value.expiry;
    }
  });


</script>
<div class="flex flex-col sm:flex-row sm:items-center text-nowrap w-full gap-4 rounded-xl bg-base-100 py-2 px-4">
  <div class="flex flex-col gap-2 w-full">
    <h1 class="text-lg font-bold text-primary">{name}</h1>
    <div class="flex items-start sm:items-center w-full gap-2 font-bold">
      <p class="text-sm text-base-100 capitalize py-1 px-2 rounded-md bg-secondary">{type}</p>
      <p class="text-sm text-base-100 capitalize py-1 px-2 rounded-md {categoryColour}">{categoryName}</p>
      {#if isExpired(expiry)}
        <p class="text-sm text-base-100 capitalize py-1 px-2 rounded-md bg-error">Expired</p>
      {:else}
        <p class="text-sm text-base-100 capitalize py-1 px-2 rounded-md bg-accent">Expires: {getDate(expiry)}</p>
      {/if}
    </div>
  </div>
  <div class="flex gap-4 items-start sm:items-center">
    <button class="btn btn-sm btn-primary sm:btn-md" on:click={handleView}>View</button>
    <CopyLink {id} />
  </div>
</div>