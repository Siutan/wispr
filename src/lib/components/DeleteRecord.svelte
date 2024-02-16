<script lang="ts">
  import { pb } from "$lib/pocketbase";
  import { resetRecordStore } from "$lib/stores/recordStore";

  export let recordId: string;
  let loading = false;
  let confirmDelete = false;

  function showModal() {
    const modal = document.getElementById("delete_modal");
    modal?.showModal();
  }

  async function deleteRecord() {
    loading = true;
    await pb.collection("content").delete(recordId);
    resetRecordStore();
    loading = false;
  }

  $: if (confirmDelete) {
    deleteRecord();
    confirmDelete = false;
  }
</script>

<button class="btn btn-sm sm:btn-md btn-error" on:click={showModal} disabled={loading}>
  {#if loading}
    <span class="loading loading-sm text-error"></span> Deleting...
  {:else}
    Delete
  {/if}
</button>

<dialog id="delete_modal" class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg text-warning">Warning!</h3>
    <p class="py-4">This will <strong>Delete</strong> the current record, you will not be able to recover this data.</p>
    <p>Do you want to continue?</p>
    <form method="dialog">
      <div class="flex gap-4 py-4">
        <button class="btn btn-primary">No</button>
        <button class="btn btn-error" on:click={() => confirmDelete = true}>Yes</button>
      </div>
    </form>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
