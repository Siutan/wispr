<script lang="ts">
  import Toast from "$lib/Toast.svelte";
  import { onMount } from "svelte";

  export let value = "";
  export let prefix = "";
  let copied = false;
  let url = ``;

  onMount(() => {
    url = window.location.href
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
    copied = true;
    setTimeout(() => {
      copied = false;
    }, 1500);
  }
</script>

{#if copied}
  <Toast content="Copied!" />
{/if}


<div class="flex items-center gap-2">
  <input {value} class="input input-primary cursor-pointer sm:w-96" disabled />
  <button class="btn btn-accent btn-sm sm:btn-md" on:click={copyToClipboard}>Copy</button>
</div>