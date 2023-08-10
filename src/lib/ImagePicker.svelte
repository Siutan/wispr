<script>
  import { apiRoutes, currentUser, pb } from "$lib/pocketbase";

  let imageUrl = apiRoutes.profileImg($currentUser);
  let fileInput; // Declare the fileInput variable

  async function handleImageChange(event) {
    const file = event.target.files[0];

    if (file) {
      let formData = new FormData();
      formData.append('avatar', file);
      await pb.collection('users').update($currentUser.id, formData);
      imageUrl = apiRoutes.profileImg($currentUser);
    }
  }
  function openFilePicker() {
    fileInput.click();
  }
</script>

<div class="avatar items-center justify-center pt-10">
  <div class="relative w-1/2 rounded">
    <button class="absolute bottom-auto left-auto right-0 top-0 z-10 inline-block bg-base-100/70 hover:bg-base-100/100 p-1 rounded m-2" on:click={openFilePicker}>
      <svg class="w-6 h-6 cursor-pointer" fill="none" stroke="currentColor"
           viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M15.5 3.5l5 5L8 21H3v-5l12.5-12.5z"></path>
      </svg>
    </button>
    <input type="file" accept="image/*" class="hidden" on:change={handleImageChange} bind:this={fileInput} />
    <img src={imageUrl} alt="User profile"/>
  </div>
</div>