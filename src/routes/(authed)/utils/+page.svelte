<script>
  import PassGen from "$lib/components/PassGen.svelte";
  import Markdown from "$lib/components/Markdown.svelte";
  import UrlShortener from "$lib/components/UrlShortener.svelte";

</script>

<div class="">
  <div class="w-full h-full p-5 bg-base-200 rounded-xl overflow-y-scroll mb-5">
    <div class="flex flex-col gap-10">
      <PassGen/>
      <UrlShortener/>
      <Markdown/>
    </div>
  </div>
</div>