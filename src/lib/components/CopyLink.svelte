<script lang="ts">
  import { addToast } from "$lib/stores/toastStore";

  export let id: string;

  function copyUrl() {

    const url = window.location.origin + "/view/" + id;
    navigator.clipboard.writeText(url);
    addToast({
      message: "URL copied to clipboard",
      type: "success",
      dismissable: true,
      duration: 3000
    });
  }

</script>

<button class="btn btn-primary btn-sm sm:btn-md" on:click={copyUrl}>Copy Url</button>
