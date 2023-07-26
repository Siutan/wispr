<script>
  import { generatePassword } from "$lib/utils.ts";

  let password = "Generate Password";

  let passwordLength = 10;
  let uppercase = true;
  let lowercase = true;
  let numeric = true;
  let special = true;

  async function generate() {
    password = await generatePassword(passwordLength, uppercase, lowercase, numeric, special);
  }
</script>

<div class="flex flex-col gap-5 p-5">
  <h2 class="text-lg font-bold text-primary">Password Generator:</h2>
  <input type="text" class="input input-primary" id="code" readonly bind:value={password} />
  <div class="flex gap-3 items-center">
    <p>Password length:</p>
    <span class="badge badge-primary font-bold">{passwordLength}</span>
  </div>
  <input type="range" min="10" max="30" bind:value={passwordLength} class="range range-primary" step="5" />
  <div class="w-full flex justify-between text-xs px-1">
    <span>|</span>
    <span>|</span>
    <span>|</span>
    <span>|</span>
    <span>|</span>
  </div>
  <div class="join join-vertical">
    <div class="form-control join-item">
      <label class="label cursor-pointer">
        <span class="label-text">Uppercase</span>
        <input type="checkbox" bind:checked={uppercase} class="checkbox checkbox-primary" />
      </label>
    </div>
    <div class="form-control join-item">
      <label class="label cursor-pointer">
        <span class="label-text">Lowercase</span>
        <input type="checkbox" bind:checked={lowercase} class="checkbox checkbox-primary" />
      </label>
    </div>
    <div class="form-control join-item">
      <label class="label cursor-pointer">
        <span class="label-text">Numeric</span>
        <input type="checkbox" bind:checked={numeric} class="checkbox checkbox-primary" />
      </label>
    </div>
    <div class="form-control join-item">
      <label class="label cursor-pointer">
        <span class="label-text">Special Characters</span>
        <input type="checkbox" bind:checked={special} class="checkbox checkbox-primary" />
      </label>
    </div>
  </div>
  <button class="btn btn-primary" on:click={generate}>Generate</button>
</div>