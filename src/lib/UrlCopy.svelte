<script lang="ts">
  import Toast from "$lib/Toast.svelte";
  import { onMount } from "svelte";
  import { addToast, removeToast, toasts } from "$lib/stores/toastStore";

  export let value = "";
  export let prefix = "";
  let url = ``;

  onMount(() => {
    url = window.location.href;
    // get the base url
    const baseUrl = url.split("/").slice(0, 3).join("/");

    value = `${baseUrl}/${prefix}/${value}`;
  });

  function copyToClipboard() {
    const textarea = document.createElement("textarea");
    textarea.value = value;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
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
  <input {value} class="input input-primary cursor-pointer sm:w-96" disabled />
  <button class="btn btn-accent btn-sm sm:btn-md" on:click|preventDefault={copyToClipboard}>Copy</button>
</div>