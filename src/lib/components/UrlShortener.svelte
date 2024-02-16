<script lang="ts">
  import { enhance } from "$app/forms";
  import { page } from "$app/stores";
  import UrlCopy from "$lib/components/UrlCopy.svelte";

  let form = $page.form;

  page.subscribe((value) => {
    form = value.form;
  })

  let loading = false;

  const handleSubmit = () => {
    loading = true;

    return async ({ update }) => {
      loading = false
      await update()
    }
  }
</script>

<!-- url shortener -->
<div class="flex flex-col gap-10">
  <h2 class="text-lg font-bold text-primary">URL Shortener:</h2>
  <form action="?/shorten" method="post" use:enhance={handleSubmit}>
    <div class="flex gap-2">
      <input class="input input-primary" type="text" name="url" placeholder="Enter URL" />
      <button class="btn btn-primary " type="submit" value="Shorten">
        Shorten
      </button>
    </div>
  </form>
  <div>
    <h3 class="text-lg font-bold text-primary">Shortened URL:</h3>
    {#if !loading}
      {#if form?.success}
        <UrlCopy prefix="sh" value={form?.data?.id} />
      {/if}
      {:else}
      <span class="loading loading-dots loading-sm"></span>
    {/if}
  </div>
</div>