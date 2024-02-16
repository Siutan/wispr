<script lang="ts">
  import type { Record } from "pocketbase";
  import { currentUser } from "$lib/pocketbase";
  import RecordItem from "$lib/components/RecordItem.svelte";
  import { selectedRecord, recordList } from "$lib/stores/recordStore";
  import RecordDetail from "$lib/components/RecordDetail.svelte";
  import type { RecordDetails } from "$lib/types/record";
  import AddRecord from "$lib/components/AddRecord.svelte";
  import { onMount } from "svelte";
  import { menuStore } from "$lib/stores/menuStore";
  import type { PageData } from "./$types";

  export let data: PageData;
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
  $: searchView = search ? $recordList.filter((item: RecordDetails) => item.name.toLowerCase().includes(search.toLowerCase()) || item.categoryName.toLowerCase().includes(search.toLowerCase()) || item.type.toLowerCase().includes(search.toLowerCase()))
    : $recordList;

  let showMenu = true;
  menuStore.subscribe((value: boolean) => {
    showMenu = value;
  });

  function toggleMenu() {
    menuStore.set(!showMenu);
  }

  // check if screen is mobile
  let isMobile = false;
  onMount(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    isMobile = mediaQuery.matches;
    mediaQuery.addEventListener("change", (e) => {
      isMobile = e.matches;
      console.log("isMobile");
    });
  });
</script>

<div class="relative flex-1 grid grid-cols-4 overflow-y-scroll p-5 gap-4">
  <div class="col-span-4 sm:col-span-2 overflow-y-scroll mb-5 bg-base-200 rounded-xl h-fit">
    <div hidden={!isMobile}>
      <button class="btn w-full" on:click={toggleMenu}>
        {showMenu ? "Hide Menu" : "Show Menu"}
      </button>
    </div>
    <div hidden={!showMenu && isMobile}>
      <div class="flex items-center bg-base-200 p-5 pb-0 sticky top-0">
        <input type="text" class="input input-primary input-md w-full" bind:value={search}
               placeholder="Filter records" />
        <div class="divider divider-horizontal"></div>
        <AddRecord />
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
        <p>No Records</p>
      {/if}
    </div>
  </div>
  <div hidden={showMenu && isMobile} class="col-span-4 sm:col-span-2 h-fit p-5 bg-base-200 rounded-xl mb-5 sm:mb-0">
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