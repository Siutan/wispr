<script lang="ts">
  import type { Record } from "pocketbase";
  import CategoryPicker from "$lib/CategoryPicker.svelte";
  import TypePicker from "$lib/TypePicker.svelte";
  import { enhance } from "$app/forms";
  import ExpiryPicker from "$lib/ExpiryPicker.svelte";
  import { currentUser, pb } from "$lib/pocketbase";

  export let data: Record;

  function getDate(datetime: string): string {
    const dateObj = new Date(datetime);
    const year = dateObj.getUTCFullYear();
    const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, "0");
    const day = dateObj.getUTCDate().toString().padStart(2, "0");

    return `${day}/${month}/${year}`;
  }

  function getDateTime(inputDateTime: string): string {
    const dateTime = new Date(inputDateTime);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      hour12: true
    };

    return new Intl.DateTimeFormat("en-US", options).format(dateTime);
  }

  function isExpired(expiry: string): boolean {
    const dateObj = new Date(expiry);
    const today = new Date();
    return dateObj < today;
  }

  async function addNew() {
    const newRecord = {
      user: $currentUser?.id,
      name: "New Record",
      type: "password",
      markdown: "",
      password: "",
      file: "",
      expiry: new Date().toISOString(),
      created: new Date().toISOString(),
      updated: "",
      category: "e5lmrwfkpo0q69l",
      expand: {
        category: {
          cat_name: "Other",
          cat_color: "bg-pink-200"
        }
      }
    };
    const sendData = await pb.collection("content").create(newRecord);

    const record = await pb.collection("content").getOne(sendData.id, ({
      sort: "-created",
      expand: "category"
    }));

    data.records = [record, ...data.records];
  }

  let search
  // search is the value of the search input field
  $: searchView = search ? data.records.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
    : data.records
</script>

<div class="w-full h-full p-5 bg-base-200 rounded-xl mb-20">
  <div class="flex gap-4 items-center rounded-xl bg-base-100 p-2 mb-5">
    <button class="btn btn-primary btn-sm" on:click={addNew}>Add New</button>
    <input type="text" class="input input-primary" bind:value={search} placeholder="Filter records" />
  </div>
  {#if data.records.length > 0}
    <div class="flex flex-col gap-5 justify-center items-center">
      {#each searchView as item, i}
        <details class="collapse bg-base-200 ">
          <summary class="text-xl font-medium">
            <div class="bg-base-100 p-3">
              <div class="flex flex-row items-center justify-between">
                <div class="flex gap-2">
                  <div
                    class={`w-10 h-10 rounded-full ${item['expand']['category']['cat_color']}`}>
                    <div class="flex flex-row items-center justify-center h-full">
                      <p
                        class="text-sm font-bold text-white mix-blend-difference">
                        {item['expand']['category']['cat_name'][0]}
                      </p>
                    </div>
                  </div>
                  <div class="flex flex-row items-center">
                    <div class="flex flex-col">
                      <p class="text-sm sm:text-lg font-bold text-primary ">{item.name}</p>
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
          <div class="collapse-content bg-base-100 px-3 py-5">
            <form method="POST" action="?/update" use:enhance={() => {
            return async ({ update }) => { update({ reset: false})}}}>
              <input type="hidden" name="itemId" value={item.id} />
              <div class="flex flex-col justify-between items-start gap-2">
                <CategoryPicker key={i}
                                categories={data.categories} currentCategory={item['expand']['category']} />
                <input name="nameInput" type="text"
                       class="input input-bordered input-primary w-full focus:outline-none"
                       value={item.name} />
              </div>
              <div class="py-2">
                <TypePicker selectedOption={item.type} markdown={item.markdown} password={item.password}
                            file={item.file} />
              </div>
              <ExpiryPicker currentExpiry={getDateTime(item['expiry'])} />
              <button type="submit" class="btn btn-primary btn-sm my-2 w-full">Save</button>
              {#if isExpired(item['expiry'])}
                <button type="submit" class="btn btn-accent btn-sm my-2 w-full">Launch</button>
              {:else}
                <button formaction="?/stop" type="submit" class="btn btn-error btn-sm my-2 w-full">Stop</button>
              {/if}
              <button formaction="?/delete" type="submit" class="btn btn-error btn-outline btn-sm my-2 w-full">Delete
              </button>
            </form>
          </div>
        </details>
      {/each}
    </div>
  {:else }
    <p>No data</p>
  {/if}
</div>