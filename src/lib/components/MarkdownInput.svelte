<script lang="ts">
  import { Markdown } from "svelte-exmarkdown";
  import { gfmPlugin } from "svelte-exmarkdown/gfm";
  import { mapRecordDetails, type RecordDetails } from "$lib/types/record";
  import { pb } from "$lib/pocketbase";
  import { recordDetails, selectedRecord } from "$lib/stores/recordStore";
  import { debounce } from "$lib/utils";

  const plugins = [gfmPlugin()];

  export let md: string;

  let selectedTab = 1;
  let editing = false;
  let loading = false;
  let previousMd = md;

  function switchTab(tab: number) {
    selectedTab = tab;
  }

  function handleInput() {
    editing = true;
    if (md === previousMd) {
      return;
    }
    debounce(1000, saveMarkdown)();
  }

  async function saveMarkdown() {
    if (editing) {
      loading = true;
      const request: RecordDetails = await pb.collection("content")
        .update($selectedRecord, { markdown: md }, {
          expand: "category"
        });
      recordDetails.set(mapRecordDetails(request));
    }
    editing = false;
    loading = false;
  }

</script>

<div class="flex flex-col gap-2 w-full h-full">
  <div role="tablist" class="tabs tabs-boxed gap-2">
    <button role="tab" class="tab {selectedTab === 1 ? 'tab-active' : ''}" on:click={() => {switchTab(1)}}>Edit</button>
    <button role="tab" class="tab {selectedTab === 2 ? 'tab-active' : ''}" on:click={() => {switchTab(2)}}>Preview</button>
    {#if loading}
      <div class="flex items-center justify-center">
        <span class="loading loading-infinity loading-lg"></span>
      </div>
    {/if}
  </div>


  {#if selectedTab === 1}
    <textarea bind:value={md} on:keyup={handleInput} class="textarea w-full h-96"></textarea>
  {:else}
    <div class=" w-full h-96 textarea overflow-y-scroll">
      <article class="prose">
        <Markdown {plugins} {md} />
      </article>
    </div>
  {/if}
</div>