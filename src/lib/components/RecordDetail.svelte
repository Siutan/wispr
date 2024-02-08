<script lang="ts">
  import { selectedRecord } from "$lib/stores/recordStore.js";
  import { pb } from "$lib/pocketbase.js";
  import { getDate, isExpired } from "$lib/utils.js";
  import TypeSelector from "$lib/components/TypeSelector.svelte";
  import NameEdit from "$lib/components/NameEdit.svelte";
  import { mapRecordDetails, type RecordDetails } from "$lib/types/record";
  import CategorySelector from "$lib/components/CategorySelector.svelte";

  let record: RecordDetails;
  let loading = false;

  selectedRecord.subscribe(value => {
    loading = true;
    if (value) {
      getRecord(value).then((res) => {
        record = res;
        loading = false;
      });
    }
  });

  async function getRecord(id: string) {
    const response = await pb.collection("content").getOne(id, ({
      sort: "-created",
      expand: "category"
    }));

    return mapRecordDetails(response)
  }

</script>

<div class="flex flex-1">
  {#if loading}
    <div class="flex items-center justify-center w-full h-full">
      <span class="loading loading-ring loading-lg"></span>
    </div>
  {:else}
    <div class="w-full">
      <NameEdit recordName={record.name}/>
      <div class="flex flex-col gap-2 w-fit">
        <p class="text-secondary/50">{record.id}</p>
        <TypeSelector type={record.type} />
        <CategorySelector categoryId={record.categoryId} categoryColor={record.categoryColor}/>
        {#if isExpired(record.expiry)}
          <p class="text-sm text-base-100 capitalize py-1 px-2 rounded-md bg-error">Expired</p>
        {:else}
          <p class="text-sm text-base-100 capitalize py-1 px-2 rounded-md bg-accent">
            Expires: {getDate(record.expiry)}</p>
        {/if}
      </div>
    </div>
  {/if}
</div>