<script lang="ts">
  import { onMount } from "svelte";
  import UserMenu from "$lib/UserMenu.svelte";

  $: active = "secrets";
  onMount(() => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      const suffix = url.pathname.split("/").pop();

      if (suffix === "secrets") {
        active = "secrets";
      } else {
        active = "utils";
      }
    }
  });

  let activeTabValue = 1;

  const handleClick = tabValue => () => (activeTabValue = tabValue);


</script>

<div class="sm:hidden btm-nav">
  <a href="/secrets" id="btm-nav-secrets" class={`text-secondary bg-base-200 ${activeTabValue === 1 ? 'active' : ''}`}
     on:click={handleClick(1)}>
    <span class="font-semibold">Secrets</span>
  </a>
  <a href="/utils" id="btm-nav-utils" class={`text-secondary bg-base-200 ${activeTabValue === 2 ? 'active' : ''}`}
     on:click={handleClick(2)}>
    <span>Utils</span>
  </a>
  <div class="btm-nav bg-base-200">
    <UserMenu />
  </div>
</div>