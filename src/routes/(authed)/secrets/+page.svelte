<script lang="ts">
  import type { Record } from "pocketbase";
  import { currentUser, pb } from "$lib/pocketbase";
  import RecordItem from "$lib/components/RecordItem.svelte";
  import { selectedRecord } from "$lib/stores/recordStore";
  import RecordDetail from "$lib/components/RecordDetail.svelte";

  export let data: Record;

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

  async function addNew() {
    const newRecord = {
      user: $currentUser?.id,
      name: "New Record",
      type: "password",
      markdown: "",
      password: "",
      file: "",
      expiry: new Date().toISOString(),
      created: new Date().toISOString(),
      updated: "",
      category: "e5lmrwfkpo0q69l",
      expand: {
        category: {
          cat_name: "Other",
          cat_color: "bg-pink-200"
        }
      }
    };
    const sendData = await pb.collection("content").create(newRecord);

    console.log(sendData);

    const record = await pb.collection("content").getOne(sendData.id, ({
      sort: "-created",
      expand: "category"
    }));

    data.records = [record, ...data.records];
  }

  let search: string;
  // search is the value of the search input field
  $: searchView = search ? data?.records.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
    : data?.records;
</script>

<div class="flex gap-4">
  <div class="w-1/2 h-full p-5 bg-base-200 rounded-xl">
    <div class="flex items-center rounded-xl bg-base-100 p-2 mb-5">
      <input type="text" class="input input-primary input-md w-full" bind:value={search} placeholder="Filter records" />
      <div class="divider divider-horizontal"></div>
      <button class="btn btn-primary btn-md" on:click={addNew}>Add New</button>
    </div>
    {#if data.records.length > 0}
      <div class="space-y-4">
        {#each searchView as record}
          <RecordItem
            id={record.id}
            name={record.name}
            type={record.type}
            categoryName={record.expand.category.cat_name}
            categoryColour={record.expand.category.cat_color}
            expiry={getDateTime(record.expiry)}
          />
        {/each}
      </div>
    {:else }
      <p>No data</p>
    {/if}
  </div>
  <div class="w-1/2 h-full p-5 bg-base-200 rounded-xl flex-grow">
    {#if $selectedRecord}
      <RecordDetail />
    {:else }
      <div class="flex h-full flex-col gap-5 justify-center items-center">
        <h1 class="text-2xl font-bold text-primary">Welcome, {$currentUser?.name}</h1>
        <p class="text-lg text-gray-400">You have {data.records.length} records</p>
        <p class="text-lg text-gray-400">Select a record or create a new one to see it here</p>
      </div>
    {/if}
  </div>
</div>