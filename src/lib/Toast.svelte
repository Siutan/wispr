<script lang="ts">
  import { fly } from "svelte/transition";
  import { createEventDispatcher } from "svelte";

  export let message = "";
  export let type: "success" | "error" | "warning" | "info" = "success";
  export let dismissible = true;

  const dispatch = createEventDispatcher();

</script>

<div class="fixed top-5 right-5 ">
  <div class="alert alert-{type} flex flex-row gap-2 items-center justify-center"
       transition:fly={{ x: 200, duration: 500 }}>
    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
    <span>{message}</span>
    {#if dismissible}
      <button class="p-1 rounded-md bg-base-100/10 hover:bg-base-100/25" on:click={() => dispatch('dismiss')}>
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none"
             viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    {/if}
  </div>
</div>