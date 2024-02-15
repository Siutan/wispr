<script lang="ts">
  import { mapRecordDetails, type RecordDetails } from "$lib/types/record";
  import { pb } from "$lib/pocketbase";
  import { recordDetails, selectedRecord } from "$lib/stores/recordStore";
  import { debounce } from "$lib/utils";
  import { encrypt, decrypt} from "$lib/crypt";

  export let password: string;

  if (password === "") {
    password = "";
  } else {
    password = decrypt(password);
  }

  let editing = false;
  let loading = false;
  let errorMessage = "";
  let previousPassword = password;

  function handleInput() {
    editing = true;
    if (password === previousPassword) {
      return;
    }
    if (password.trim() === "") {
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
        .update($selectedRecord, { password: encrypt(password) }, {
          expand: "category"
        });
      recordDetails.set(mapRecordDetails(request));
    }
    editing = false;
    loading = false;
    previousPassword = password;
  }

  let showPassword = false

  function setType() {
    showPassword = !showPassword
    let passwordInput = document.getElementById("passwordInput")
    if (showPassword) {
      passwordInput.setAttribute("type", "text")
    } else {
      passwordInput.setAttribute("type", "password")
    }
  }

</script>


<div class="flex gap-4 w-full">
  <input
    id="passwordInput"
    type="password"
    class="w-1/2 input input-primary"
    bind:value={password}
    on:keyup={handleInput}
  />
  <button class="btn btn-outline" on:click={setType}>
    Show Password
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