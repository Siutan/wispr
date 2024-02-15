<script lang="ts">
  import { currentUser } from "$lib/pocketbase";
  import "../../app.postcss";
  import UserMenu from "$lib/UserMenu.svelte";
  import BottomNav from "$lib/BottomNav.svelte";
  import { removeToast, toasts } from "$lib/stores/toastStore";
  import Toast from "$lib/Toast.svelte";
</script>

{#if $toasts}
  {#each $toasts as toast (toast.id)}
    <Toast type={toast.type} message={toast.message} on:dismiss={() => removeToast(toast.id)} />
  {/each}
{/if}

<div class="flex flex-col w-screen h-screen bg-base-100 overflow-hidden">
  <div class="hidden sm:grid">
    <div class="flex navbar bg-base-100">
      <div class="navbar-start">
        <span class="btn btn-ghost btn-outline normal-case text-xl m-2">WISPR</span>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          <li>
            <a href="/secrets" class="text-lg">Secrets</a>
          </li>
          <li>
            <a href="utils" class="text-lg">Utilities</a>
          </li>
        </ul>
      </div>
      <div class="navbar-end">
        {#if $currentUser}
          <UserMenu />
        {/if}
      </div>
    </div>
  </div>

  <slot />
  <div class="p-5 sm:p-10">
  </div>
  <BottomNav />
</div>