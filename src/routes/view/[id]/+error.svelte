<script>
  import { page } from '$app/stores';
import ThemeSwitch from "$lib/themes/ThemeSwitch.svelte";
</script>

<div class="absolute top-5 left-5">
  <ThemeSwitch/>
</div>

<div class="flex flex-col gap-2 justify-center items-center p-5">
    <div class="card flex juistify-center items-center p-3 bg-base-100">
      <h1 class="text-3xl badge badge-error p-5">{$page.status}</h1>
      {#if $page.status === 404}
        <h1 class="text-3xl font-bold">Record not Found 😔</h1>
        <div class="flex flex-col justify-between items-start card-body">
          <p class="text-lg font-semibold">Make sure you entered the correct link and/or the requested content is currently active.</p>
        </div>
      {:else}
        <h1 class="text-3xl">Something went wrong</h1>
      {/if}
      <p class="text-lg font-semibold">If this is a mistake, please let me know on discord <code>@mukilcb</code></p>
    </div>
</div>