<script lang="ts">
  import { pb } from "$lib/pocketbase";
  import { type Category, mapCategory } from "$lib/types/category";
  import { recordDetails, selectedRecord } from "$lib/stores/recordStore";
  import { mapRecordDetails, type RecordDetails } from "$lib/types/record";
  import type { Record } from "pocketbase";

  export let categoryId: string;
  export let categoryColor: string;

  let loading = false;

  async function loadCategory() {
    loading = true;
    const categoryData = await pb.collection("categories").getFullList();
    loading = false;
    return categoryData.map((category: Record) => mapCategory(category)) as Category[];
  }

  async function updateCategory() {
    loading = true;
    const request: RecordDetails = await pb.collection("content")
      .update($selectedRecord, { category: categoryId }, { expand: "category" });
    const formattedData = mapRecordDetails(request);
    recordDetails.set(formattedData);
    categoryColor = formattedData.categoryColor;
    loading = false;
  }

</script>

<div class="flex gap-2">
  <select class="select {categoryColor} font-semibold text-base-100" bind:value={categoryId} on:change={updateCategory}>
    <option value="">Select Category</option>
    {#await loadCategory()}
      <option value="">Loading...</option>
    {:then categoryData}
      {#each categoryData as category}
        <option selected={category.id === categoryId} value={category.id}>{category.name}</option>
      {/each}
    {/await}
  </select>

  {#if loading}
    <div class="flex items-center justify-center w-full h-full">
      <span class="loading loading-infinity loading-lg"></span>
    </div>
  {/if}
</div>