<script lang="ts">
  import type { Record } from "pocketbase";
  import { currentUser, pb } from "$lib/pocketbase";
  import RecordItem from "$lib/components/RecordItem.svelte";
  import { selectedRecord, recordList } from "$lib/stores/recordStore";
  import RecordDetail from "$lib/components/RecordDetail.svelte";
  import { mapRecordDetails, type RecordDetails } from "$lib/types/record";
  import AddRecord from "$lib/components/AddRecord.svelte";

  export let data: Record;
  recordList.set(data?.records);

  function getDateTime(inputDateTime: string): string {
    const dateTime = new Date(inputDateTime);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      hour12: true
    };

    return new Intl.DateTimeFormat("en-US", options).format(dateTime);
  }

  let search: string;
  $: searchView = search ? $recordList.filter((item: RecordDetails) => item.name.toLowerCase().includes(search.toLowerCase()))
    : $recordList;

</script>

<div class="flex-1 grid grid-cols-4 overflow-y-scroll p-5 gap-4">
  <div class="col-span-4 sm:col-span-2 overflow-y-scroll flex flex-col bg-base-200 rounded-xl">
    <div class="flex items-center bg-base-200 p-5 sticky top-0">
      <input type="text" class="input input-primary input-md w-full" bind:value={search} placeholder="Filter records" />
      <div class="divider divider-horizontal"></div>
      <AddRecord/>
    </div>
    {#if $recordList.length > 0}
      <div class="space-y-4 p-5 flex-1">
        {#each searchView as record}
          <RecordItem
            id={record.id}
            name={record.name}
            type={record.type}
            categoryName={record.categoryName}
            categoryColour={record.categoryColor}
            expiry={getDateTime(record.expiry)}
          />
        {/each}
      </div>
    {:else }
      <p>No data</p>
    {/if}
  </div>
  <div class="hidden sm:block col-span-2 h-fit p-5 bg-base-200 rounded-xl flex-grow">
    {#if $selectedRecord}
      <RecordDetail />
    {:else }
      <div class="flex h-full flex-col gap-5 justify-center items-center">
        <h1 class="text-2xl font-bold text-primary">Welcome, {$currentUser?.name}</h1>
        <p class="text-lg text-gray-400">You have {$recordList.length} records</p>
        <p class="text-lg text-gray-400">Select a record or create a new one to see it here</p>
      </div>
    {/if}
  </div>
</div>

<style>
  .overflow-y-scroll::-webkit-scrollbar {
    width: 0;
  }
  .overflow-y-scroll:hover::-webkit-scrollbar {
    width: 8px;
  }
  .overflow-y-scroll::-webkit-scrollbar-thumb {
    background-color: rgba(196, 196, 196, 0.2);
    border-radius: 4px;
  }
  .overflow-y-scroll::-webkit-scrollbar-thumb:hover {
    background-color: rgba(196, 196, 196, 0.5);
  }
  .overflow-y-scroll::-webkit-scrollbar-track {
    background-color: transparent;
  }
  .overflow-y-scroll::-webkit-scrollbar-track:hover {
    background-color: transparent;
  }
  .overflow-y-scroll::-webkit-scrollbar-button {
    display: none;
  }
  .overflow-y-scroll::-webkit-scrollbar-corner {
    display: none;
  }
  .overflow-y-scroll::-webkit-resizer {
    display: none;
  }
</style>