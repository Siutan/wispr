<script lang="ts">

  export let selectedOption = 'password';
  export let password: string;
  export let markdown: string;
  export let file: File;

</script>

<div class="flex flex-col gap-4">
  <select name="typeSelect" class="select select-primary select-md w-full max-w-xs" bind:value={selectedOption}>
    <option value="password">Password</option>
    <option value="markdown">Markdown</option>
    <option value="file">File</option>
  </select>

  {#if selectedOption === 'password'}
    <input name="passwordInput" value={password} class="input input-primary" type="password" placeholder="Enter your password" />
  {:else if selectedOption === 'markdown'}
    <textarea name="markdownInput" value={markdown} class="textarea textarea-primary" placeholder="Enter markdown content"></textarea>
  {:else if selectedOption === 'file'}
    <input name="fileInput" value={file|| null} class="file-input file-input-ghost file-sm w-full max-w-xs" type="file" />
  {/if}
</div>
