<script lang="ts">
  export let selectedOption = 'password';
  export let password: string;
  export let markdown: string;
  export let file: File;

  // toggle view of password
  const togglePassword = () => {
    const passwordInput = document.querySelector('input[name="passwordInput"]');
    if (passwordInput.getAttribute('type') === 'password') {
      passwordInput.setAttribute('type', 'text');
    } else {
      passwordInput.setAttribute('type', 'password');
    }
  }

</script>

<div class="flex flex-col gap-4">

  <label for="typeSelect" class="label font-bold text-sm">Type</label>
  <select id="typeSelect" name="typeSelect" class="select select-primary select-md w-full max-w-xs" bind:value={selectedOption}>
    <option value="password">Password</option>
    <option value="markdown">Markdown</option>
    <option value="file">File</option>
  </select>

  {#if selectedOption === 'password'}
    <div class="flex gap-2 items-center w-full ">
      <input name="passwordInput" value={password} class="input input-primary" type="password" placeholder="Enter your password" />
      <button class="btn btn-primary" on:click={togglePassword}>View</button>
    </div>
  {:else if selectedOption === 'markdown'}
    <textarea name="markdownInput" class="textarea textarea-primary" placeholder="Enter markdown content">{markdown}</textarea>
  {:else if selectedOption === 'file'}
    <input name="fileInput" value={file|| null} class="file-input file-input-ghost file-sm w-full max-w-xs" type="file" />
  {/if}
</div>
