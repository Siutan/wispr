<script lang="ts">
  import Toast from "$lib/Toast.svelte";

  export let value = "";
  let copied = false;

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
  <input type="text" {value} class="input input-primary cursor-pointer sm:w-96" disabled />
  <button class="btn btn-accent btn-sm sm:btn-md" on:click={copyToClipboard}>Copy</button>
</div>