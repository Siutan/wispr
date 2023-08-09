<script>
  import { Editor } from "bytemd";
  import gfm from "@bytemd/plugin-gfm";
  import highlight from "@bytemd/plugin-highlight";

  let value;

  const plugins = [gfm(), highlight()];

  function handleChange(e) {
    value = e.detail.value;
  }
</script>

<h2 class="text-lg font-bold text-primary">Markdown Editor: </h2>
<Editor {value} {plugins} on:change={handleChange} />
