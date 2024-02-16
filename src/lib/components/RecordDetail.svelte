<script lang="ts">
  import { recordDetails, selectedRecord } from "$lib/stores/recordStore.js";
  import { pb } from "$lib/pocketbase.js";
  import TypeSelector from "$lib/components/TypeSelector.svelte";
  import NameEdit from "$lib/components/NameEdit.svelte";
  import { mapRecordDetails, type RecordDetails } from "$lib/types/record";
  import CategorySelector from "$lib/components/CategorySelector.svelte";
  import PasswordInput from "$lib/components/PasswordInput.svelte";
  import MarkdownInput from "$lib/components/MarkdownInput.svelte";
  import DateSelector from "$lib/components/DateSelector.svelte";
  import StopSharing from "$lib/components/StopSharing.svelte";
  import DeleteRecord from "$lib/components/DeleteRecord.svelte";

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

  recordDetails.subscribe(value => {
    if (value) {
      record = value;
    }
  });

  async function getRecord(id: string) {
    const response = await pb.collection("content").getOne(id, ({
      sort: "-created",
      expand: "category"
    }));

    return mapRecordDetails(response);
  }

</script>

<div class="flex flex-1 h-full">
  {#if loading}
    <div class="flex items-center justify-center w-full h-full">
      <span class="loading loading-ring loading-lg"></span>
    </div>
  {:else}
    <div class="w-full">
      <div class="flex flex-col sm:flex-row gap-2 py-2">
        <NameEdit recordName={record.name} />
        <StopSharing expiry={record.expiry} />
        <DeleteRecord recordId={record.id} />
      </div>
      <p class="text-secondary/50">{record.id}</p>
      <div class="flex flex-col sm:flex-row justify-between py-2 gap-5 sm:gap-0">
        <DateSelector currentExpiry={record.expiry} />
        <div class="flex sm:flex-col items-end justify-between gap-2">
          <TypeSelector selectedType={record.type} />
          <CategorySelector categoryId={record.categoryId} categoryColor={record.categoryColor} />
        </div>
      </div>
      <div class="w-full mt-4">
        {#if record.type === "password" }
          <div class="flex gap-2">
            <div class="w-full">
              <p class="text-secondary/50">Password</p>
              <PasswordInput password={record.password} />
            </div>
          </div>
        {:else if record.type === "markdown" }
          <div class="w-full">
            <p class="text-secondary/50">Markdown</p>
            <MarkdownInput md={record.markdown} />
          </div>
        {/if}
      </div>
    </div>
  {/if}
</div>