<script lang="ts">
  export let markdown: string
</script>

<div role="tablist" class="tabs tabs-bordered">
  <input type="radio" name="Input" role="tab" class="tab" aria-label="Tab-input" />
  <div role="tabpanel" class="tab-content p-10">Input</div>

  <input type="radio" name="Preview" role="tab" class="tab" aria-label="Tab-preview" />
  <div role="tabpanel" class="tab-content p-10">Preview</div>
</div>