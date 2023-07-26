<script lang="ts">
  import type { Record } from "pocketbase";

  export let key: number;
  export let categories: Record[];
  export let currentCategory;

  $: catColor = currentCategory?.cat_color;
  $: catName = currentCategory?.cat_name;

  function setCategoryColor(event: Event) {
    const select = event.target as HTMLSelectElement;
    // color is the name of the selected option
    catColor = select.options[select.selectedIndex].id;
    catName = select.options[select.selectedIndex].text;
  }


</script>
<div class="flex gap-2 justify-center items-center">
  <p class="label font-bold text-sm">Category:</p>
  <label for={key} class={`badge p-3 rounded-full shrink-0 ${catColor}`}>
    <span class="text-base-300 font-bold">{catName}</span>
  </label>
</div>

<!-- Put this part before </body> tag -->
<input type="checkbox" id={key} class="modal-toggle" />
<div class="modal">
  <div class="modal-box space-y-2">
    <h3 class="text-lg font-bold">Category Selector</h3>
    <select name="catSelect" class="select focus:outline-none" on:change={setCategoryColor}>
      {#each categories as category}
        <option value={category.id} id={category.cat_color} selected={category.cat_color === catColor} >{category.cat_name}</option>
      {/each}
    </select>
    <div class="modal-action">
      <label for={key} class="btn btn-sm">Close</label>
    </div>
  </div>
</div>
