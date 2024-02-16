<script lang="ts">
  import { Markdown } from "svelte-exmarkdown";
  import { gfmPlugin } from "svelte-exmarkdown/gfm";
  import { addToast } from "$lib/stores/toastStore";

  const plugins = [gfmPlugin()];
  let md: string;

  let selectedTab = 1;

  function switchTab(tab: number) {
    selectedTab = tab;
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(md);
    addToast({
      message: "Copied to clipboard",
      type: "success",
      dismissable: true,
      duration: 3000
    });
  }
</script>

<div class="flex flex-col gap-2 w-full h-full">
  <div role="tablist" class="tabs tabs-boxed gap-2">
    <button role="tab" class="tab {selectedTab === 1 ? 'tab-active' : ''}" on:click={() => {switchTab(1)}}>Edit</button>
    <button role="tab" class="tab {selectedTab === 2 ? 'tab-active' : ''}" on:click={() => {switchTab(2)}}>Preview
    </button>
  </div>


  {#if selectedTab === 1}
    <textarea bind:value={md} class="textarea w-full h-96"></textarea>
  {:else}
    <div class="relative w-full h-96 textarea overflow-y-scroll">
      <button class="btn absolute top-3 right-3" on:click={copyToClipboard}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
             class="lucide lucide-copy">
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </svg>
      </button>
      <article class="prose">
        <Markdown {plugins} {md} />
      </article>
    </div>
  {/if}
</div>