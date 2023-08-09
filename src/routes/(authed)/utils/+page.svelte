<script>
  import PassGen from "$lib/PassGen.svelte";
  import Markdown from "$lib/Markdown.svelte";
  import UrlShortener from "$lib/UrlShortener.svelte";
  export let form

</script>

<div class="w-full h-full p-5 bg-base-200 rounded-xl mb-20">
  <div class="flex flex-col gap-10">
    <PassGen/>
    <UrlShortener {form}/>

    <Markdown/>
  </div>
</div>