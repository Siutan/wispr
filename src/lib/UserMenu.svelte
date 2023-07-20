<script lang="ts">
  import { currentUser, pb, apiRoutes } from "$lib/pocketbase";
  import { applyAction, enhance } from "$app/forms";
  import ThemeSwitch from "$lib/themes/ThemeSwitch.svelte";
</script>

<div class="dropdown dropdown-top sm:dropdown-bottom dropdown-end">
  <label tabindex="0" class="btn btn-ghost rounded-btn">
    <div class="avatar">
      <div class="w-10 rounded">
        <img src={apiRoutes.profileImg($currentUser)} alt="User profile" />
      </div>
    </div>
  </label>
  <ul tabindex="0" class="menu dropdown-content z-[1] p-2 shadow bg-base-200 rounded-box w-52 mt-4">
    <ThemeSwitch/>
    <li><a href="#">Settings</a></li>
    <li>
      <form
        method="POST"
        action="/logout"
        use:enhance={() => {
                return async ({ result }) => {
                  pb.authStore.clear()
                  await applyAction(result)
                }
              }}
      >
        <button>Log out</button>
      </form>
    </li>
  </ul>
</div>
