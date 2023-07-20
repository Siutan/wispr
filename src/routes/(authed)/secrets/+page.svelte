<script lang="ts">
  import type { Record } from "pocketbase";
  import CategoryPicker from "$lib/CategoryPicker.svelte";

  export let data: Record;

  console.log(data);

  function getCategory(category, categoryColor) {
    if (category !== null) {
      return {
        name: category,
        color: categoryColor
      };
    } else {
      return {
        name: "Uncategorized",
        color: "gray"
      };
    }
  }

  function getDate(datetime: string): string {
    const dateObj = new Date(datetime);
    const year = dateObj.getUTCFullYear();
    const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, "0");
    const day = dateObj.getUTCDate().toString().padStart(2, "0");

    return `${day}/${month}/${year}`;
  }


</script>

<div class="w-full h-full p-5 bg-base-200 rounded-xl">
  <div class="flex h-10 rounded-xl bg-base-100 p-2 mb-5">

  </div>
  {#if data.records.length > 0}
    <div class="flex flex-col gap-5 justify-center items-center">
      {#each data.records as item, i}
        <details class="collapse bg-base-200 ">
          <summary class="text-xl font-medium">
            <div class="bg-base-100 p-3">
              <div class="flex flex-row items-center justify-between">
                <div class="flex gap-2">
                  <div
                    class={`w-10 h-10 rounded-full ${item['expand']['category']['cat_color']}`}
                    style="background-color: {item['expand']['category']['cat_color']}">
                    <div class="flex flex-row items-center justify-center h-full">
                      <p
                        class="text-sm font-bold text-white mix-blend-difference">{item['expand']['category']['cat_name'][0]}</p>
                    </div>
                  </div>
                  <div class="flex flex-row items-center">
                    <div class="flex flex-col">
                      <p class="text-sm sm:text-lg font-bold">{item.name}</p>
                      <p class="text-sm text-gray-400">{getDate(item.created)}</p>
                    </div>
                  </div>
                </div>
                <div class="flex flex-col items-center">
                  <p class="btn btn-primary btn-xs">Edit</p>
                </div>
              </div>
            </div>
          </summary>
          <form>
            <div class="collapse-content bg-base-100 px-2 py-5">
              <div class="flex justify-between items-between gap-2">
                <CategoryPicker key={i}
                                categories={data.categories} currentCategory={item['expand']['category']} />
                <input type="text" class="input input-bordered input-primary max-w-xs focus:outline-none"
                       value={item.name} />
              </div>
            </div>

          </form>
        </details>
      {/each}
    </div>
  {:else }
    <p>No data</p>
  {/if}
</div>