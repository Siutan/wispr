<script lang="ts">
  import { mapRecordDetails, type RecordDetails } from "$lib/types/record";
  import { pb } from "$lib/pocketbase";
  import { recordDetails, selectedRecord } from "$lib/stores/recordStore";
  import { debounce } from "$lib/utils";
  import { encrypt, decrypt } from "$lib/crypt";

  export let password: string;

  let inputPassword: string;

  if (password === "") {
    password = "";
  } else {
    inputPassword = decrypt(password);
  }

  let editing = false;
  let loading = false;
  let errorMessage = "";
  let previousPassword = inputPassword;

  function handleInput() {
    editing = true;
    if (inputPassword === previousPassword) {
      return;
    }
    if (inputPassword.trim() === "") {
      errorMessage = "Password cannot be empty";
      return;
    }
    errorMessage = "";
    debounce(1000, savePassword)();
  }

  async function savePassword() {
    if (editing) {
      loading = true;
      const request: RecordDetails = await pb.collection("content")
        .update($selectedRecord, { password: encrypt(inputPassword) }, {
          expand: "category"
        });
      recordDetails.set(mapRecordDetails(request));
    }
    editing = false;
    loading = false;
    previousPassword = inputPassword;
  }

  let showPassword = false;

  function setType() {
    showPassword = !showPassword;
    let passwordInput = document.getElementById("passwordInput");
    if (showPassword) {
      passwordInput.setAttribute("type", "text");
    } else {
      passwordInput.setAttribute("type", "password");
    }
  }

</script>


<div class="flex gap-4 w-full">
  <input
    id="passwordInput"
    type="password"
    class="w-full input input-sm sm:input-md input-primary"
    bind:value={inputPassword}
    on:keyup={handleInput}
  />
  <button class="flex btn btn-outline btn-sm sm:btn-md" on:click={setType}>
    {showPassword ? "Hide" : "Show"}
  </button>
  {#if loading}
    <div class="flex items-center justify-center">
      <span class="loading loading-infinity loading-lg"></span>
    </div>
  {/if}
</div>
{#if errorMessage}
  <p class="text-error">{errorMessage}</p>
{/if}