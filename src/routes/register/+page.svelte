<script lang="ts">
  import { applyAction, enhance } from "$app/forms";
  import { pb } from "$lib/pocketbase";
  import { page } from "$app/stores";
</script>

<div class="sm:w-1/3 w-full p-5 m-5 sm:m-0 bg-base-100 rounded-xl">
  <form
    method="POST"
    class="card"
    use:enhance={() => {
    return async ({ result }) => {
      pb.authStore.loadFromCookie(document.cookie)
      await applyAction(result)
    }
  }}
  >
    {#if $page?.form?.error}
      <div class="toast toast-top toast-center">
        <div class="alert alert-error px-10">
          <span>{$page?.form?.error}</span>
        </div>
      </div>
    {/if}
    <img class="w-20 sm:w-28 place-self-center m-5 filter mix-blend-difference mb-10" src="logo/logo-white.png" alt="Wispr Logo"/>
    <div class="form-control gap-5 p-5 mb-4">
      <input
        type="email"
        name="email"
        placeholder="Email"
        class="input input-bordered"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        class="input input-bordered"
      />
      <input
        type="password"
        name="passwordConfirm"
        placeholder="Confirm password"
        class="input input-bordered"
      />
      <button class="btn btn-primary">Register</button>
      <div class="divider px-20"></div>
      <div class="flex gap-2 justify-center">
        <p>Already have an account?</p>
        <a href="/login" class="text-primary">Log In</a>
      </div>
    </div>
  </form>
</div>