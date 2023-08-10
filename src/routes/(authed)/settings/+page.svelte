<script>
  import { currentUser } from "$lib/pocketbase";
  import { enhance } from "$app/forms";
  import ImagePicker from "$lib/ImagePicker.svelte";
</script>

<div>

  <div class="">
    <div class="w-full lg:w-4/12 px-4 mx-auto">
      <div class=" flex flex-col min-w-0 break-words bg-base-200 w-full mb-6 shadow-xl rounded-lg mt-16">
        <ImagePicker/>
        <div class="px-6">
          <div class="text-center mt-12">
            <h2 class="text-2xl font-semibold leading-normal mb-2">
              {$currentUser.username}
            </h2>
            <h3 class="text-xl font-semibold leading-normal mb-2">
              {$currentUser.email}
            </h3>
          </div>
          <div class="mt-10 py-10 border-t text-center">
            <div class="flex flex-wrap justify-center gap-5">
              <form action="?/deleteAccount" method="post" use:enhance>
                <button class="btn btn-error">
                  Delete Account
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
