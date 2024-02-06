<script lang="ts">
  import { applyAction, enhance } from "$app/forms";
  import { PUBLIC_ALLOW_SIGNUP } from "$env/static/public";
  import { pb } from "$lib/pocketbase";
  import { page } from "$app/stores";
  import ThemeSwitch from "$lib/themes/ThemeSwitch.svelte";
  import Toast from "$lib/Toast.svelte";
  import { removeToast, toasts, addToast } from "$lib/stores/toastStore";

  $: if ($page?.form?.error) {
    addToast({
      message: $page?.form?.error,
      type: "error",
      dismissable: true,
      duration: 3000
    });
  }

  let loading = false;
</script>

<div class="absolute top-5 left-5">
  <ThemeSwitch />
</div>

{#if $toasts}
  {#each $toasts as toast (toast.id)}
    <Toast type={toast.type} message={toast.message} on:dismiss={() => removeToast(toast.id)} />
  {/each}
{/if}

<div class="sm:w-1/3 w-full p-5 m-5 sm:m-0 bg-base-100 rounded-xl">
  <form
    method="POST"
    class="card"
    on:submit={() => {loading = true}}
    use:enhance={() => {
    return async ({ result }) => {
      loading = false
      pb.authStore.loadFromCookie(document.cookie)
      await applyAction(result)
    }
  }}
  >
    <img class="w-20 sm:w-28 place-self-center m-5 filter mix-blend-difference mb-10" src="logo/logo-white.png"
         alt="Wispr Logo" />
    <div class="form-control gap-5 mb-4 sm:px-10">
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
      {#if loading}
        <button class="btn btn-primary loading">Loading...</button>
      {:else}
        <button class="btn btn-primary">Login</button>
      {/if}
    </div>
    {#if PUBLIC_ALLOW_SIGNUP !== "false"}
      <div class="divider px-20"></div>
      <div class="flex gap-2 justify-center">
        <p>Don't have an account?</p>
        <a href="/register" class="text-primary">Register</a>
      </div>
    {/if}
  </form>
</div>