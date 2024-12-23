<script lang="ts">
  import Toast from "$lib/components/Toast.svelte";
  import { addToast, removeToast, toasts } from "$lib/stores/toastStore";

  interface Props {
    value?: string;
  }

  let { value = "" }: Props = $props();

  function copyToClipboard() {
    navigator.clipboard.writeText(value);
    addToast({
      message: "Copied to clipboard",
      type: "success",
      dismissable: true,
      duration: 3000
    });
  }
</script>

{#if $toasts}
  {#each $toasts as toast (toast.id)}
    <Toast type={toast.type} message={toast.message} on:dismiss={() => removeToast(toast.id)} />
  {/each}
{/if}


<div class="flex items-center gap-2">
  <input type="text" {value} class="input input-primary cursor-pointer sm:w-96" disabled />
  <button class="btn btn-accent btn-sm sm:btn-md" onclick={copyToClipboard}>Copy</button>
</div>