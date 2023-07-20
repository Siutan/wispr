<script lang="ts">

  import { getCategories } from "$lib/categories";
  import type { Record } from "pocketbase";

  export let key: number;
  export let categories: Record[];
  export let currentCategory

  $: catColor = currentCategory?.cat_color

  function setCategoryColor(event: Event) {
    const select = event.target as HTMLSelectElement
    const color = select.value
    console.log(color)
    catColor = color
  }


</script>

<label for={key} class={`w-10 h-10 rounded-full shrink-0 ${catColor}`}>

</label>

<!-- Put this part before </body> tag -->
<input type="checkbox" id={key} class="modal-toggle" />
<div class="modal">
  <div class="modal-box space-y-2">
    <h3 class="text-lg font-bold">Category Selector</h3>
    <select class="select focus:outline-none" on:change={setCategoryColor}>
      {#each categories as category}
        <option value={category.cat_color}>{category.cat_name}</option>
      {/each}
    </select>
    <div class="modal-action">
      <label for={key} class="btn btn-sm">Close</label>
    </div>
  </div>
</div>
