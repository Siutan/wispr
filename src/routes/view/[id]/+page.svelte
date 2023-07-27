<script lang="ts">
  import ThemeSwitch from "$lib/themes/ThemeSwitch.svelte";
  import ContentCopy from "$lib/ContentCopy.svelte";

  export let data;

  console.log("DATA:", data.record);

</script>

<div class="absolute top-5 left-5">
  <ThemeSwitch/>
</div>

<div class="flex flex-col gap-2 justify-center items-center">
  {#if data.record.type === "password"}
    <div class="card flex juistify-center items-center px-2 py-3 bg-base-100">
      <h1 class="text-4xl font-bold">{data.record.name}</h1>
      <div class="flex flex-col justify-between items-start card-body">
        <ContentCopy value={data.record.password} />
      </div>
    </div>
  {:else if data.record.type === "markdown"}
    <div class="card flex juistify-center items-center px-2 py-3 bg-base-100">
      <div class="flex flex-col w-full justify-between items-start card-body">
        <h1 class="text-4xl font-bold">{data.record.name}</h1>
        <textarea class="textarea w-[70vw] bg-base-200 h-96" readonly>{data.record.markdown}</textarea>
      </div>
    </div>
  {:else}
    <p>files not yet supported</p>
  {/if}
</div>