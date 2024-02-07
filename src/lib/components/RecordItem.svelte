<script lang="ts">
  import { selectedRecord } from "$lib/stores/recordStore";

  export let id: string;
  export let name: string;
  export let type: string;
  export let categoryName: string;
  export let categoryColour: string;
  export let expiry: string;

  function isExpired(expiry: string): boolean {
    const dateObj = new Date(expiry);
    const today = new Date();
    return dateObj < today;
  }

  function getDate(datetime: string): string {
    const dateObj = new Date(datetime);
    const year = dateObj.getUTCFullYear();
    const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, "0");
    const day = dateObj.getUTCDate().toString().padStart(2, "0");

    return `${day}/${month}/${year}`;
  }

  function handleView() {
    console.log("Viewing:", id);
    selectedRecord.set(id);
  }

</script>

<div class="flex text-nowrap w-full gap-4 items-center rounded-xl bg-base-100 py-2 px-4">
  <div class="flex flex-col gap-2 w-full">
    <h1 class="text-lg font-bold text-primary">{name}</h1>
    <div class="flex w-full items-center gap-2 font-bold">
      <p class="text-sm text-base-100 capitalize py-1 px-2 rounded-md bg-secondary">{type}</p>
      <p class="text-sm text-base-100 capitalize py-1 px-2 rounded-md {categoryColour}">{categoryName}</p>
      {#if isExpired(expiry)}
        <p class="text-sm text-base-100 capitalize py-1 px-2 rounded-md bg-error">Expired</p>
      {:else}
        <p class="text-sm text-base-100 capitalize py-1 px-2 rounded-md bg-accent">Expires: {getDate(expiry)}</p>
      {/if}
    </div>
  </div>
  <div class="flex gap-4 items-center">
    <button class="btn btn-primary btn-md" on:click={handleView}>View</button>
    <button class="btn btn-primary btn-md">Copy Url</button>
  </div>
</div>