<script lang="ts">
  import { currentUser } from "$lib/pocketbase";
  import "../../app.postcss";
  import UserMenu from "$lib/UserMenu.svelte";
  import BottomNav from "$lib/BottomNav.svelte";
  import ThemeSwitch from "$lib/themes/ThemeSwitch.svelte";
</script>

<div class="w-screen h-screen bg-base-100">
  <div class="hidden sm:flex navbar bg-base-100">
    <div class="navbar-start">
      <span class="btn btn-ghost btn-outline normal-case text-xl m-2">WISPR</span>
      <ThemeSwitch/>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li>
          <span class="text-lg">Secrets</span>
        </li>
        <li>
          <span class="text-lg">Utilities</span>
        </li>
      </ul>
    </div>
    <div class="navbar-end">
      {#if $currentUser}
        <UserMenu />
      {/if}
    </div>
  </div>

  <div class="p-5 sm:p-10">
    <slot />
  </div>
  <BottomNav />
</div>