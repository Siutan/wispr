<script lang="ts">
  import { selectedRecord } from "$lib/stores/recordStore.js";
  import { pb } from "$lib/pocketbase.js";
  import { getDate, isExpired } from "$lib/utils.js";
  import TypeSelector from "$lib/components/TypeSelector.svelte";

  let record: any;
  let loading = false;

  selectedRecord.subscribe(value => {
    loading = true;
    if (value) {
      getRecord(value).then((res) => {
        record = res;
        loading = false;
        console.log(record);
      });
    }
  });

  async function getRecord(id: string) {
    return await pb.collection("content").getOne(id, ({
      sort: "-created",
      expand: "category"
    }));
  }

  let editName = false;

  $: if (editName) {
    console.log("editing");
  }

</script>

<div class="flex flex-1">
  {#if loading}
    <div class="flex items-center justify-center w-full h-full">
      <span class="loading loading-ring loading-lg"></span>
    </div>
  {:else}
    <div>
      <div class="flex gap-2">
        <h1 id="nameBox" class="text-2xl text-primary font-bold" contenteditable={editName}>
          {record.name}
        </h1>
        <button class="btn btn-sm btn-outline"
                on:click={() => editName = !editName}>{editName ? "Done" : "Edit"}</button>
      </div>
      <div class="flex flex-col gap-2 w-fit">
        <p class="text-secondary/50">{record.id}</p>
        <p class="text-sm text-base-100 capitalize py-1 px-2 rounded-md bg-secondary">{record.type}</p>
        <TypeSelector type={record.type}/>
        <p class="text-sm text-base-100 capitalize py-1 px-2 rounded-md {record.expand.category.cat_color}">{record.expand.category.cat_name}</p>
        {#if isExpired(record.expiry)}
          <p class="text-sm text-base-100 capitalize py-1 px-2 rounded-md bg-error">Expired</p>
        {:else}
          <p class="text-sm text-base-100 capitalize py-1 px-2 rounded-md bg-accent">Expires: {getDate(record.expiry)}</p>
        {/if}
      </div>
    </div>
  {/if}
</div>