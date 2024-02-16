<script lang="ts">
  import { selectedRecord, recordDetails } from "$lib/stores/recordStore";
  import { pb } from "$lib/pocketbase";
  import { mapRecordDetails, type RecordDetails } from "$lib/types/record";

  export let selectedType: string;

  let loading = false;
  let confirmDelete = false;

  async function updateType() {
    loading = true;
    let updateData = { type: selectedType };
    if (selectedType === "password") {
      updateData["markdown"] = null;
    } else if (selectedType === "markdown") {
      updateData["password"] = null;
    }
    const request: RecordDetails = await pb.collection("content")
      .update($selectedRecord, updateData, { expand: "category" });
    recordDetails.set(mapRecordDetails(request));
    loading = false;
  }

  function showModal() {
    const modal = document.getElementById("type_modal");
    modal?.showModal();
  }

  $: if (confirmDelete) {
    updateType();
    confirmDelete = false;
  }

</script>

<div class="flex gap-2">
  {#if loading}
    <div class="flex items-center justify-center w-full h-full">
      <span class="loading loading-infinity loading-lg"></span>
    </div>
  {/if}
  <select class="select select-sm sm:select-md" bind:value={selectedType} on:change={showModal}>
    <option value="password">Password</option>
    <option value="markdown">Markdown</option>
  </select>
</div>

<dialog id="type_modal" class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg text-warning">Warning!</h3>
    <p class="py-4">Changing the type will remove current password/markdown.</p>
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

