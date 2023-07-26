<script>
  import "bytemd/dist/index.css";
  import { Editor, Viewer } from "bytemd";
  import gfm from "@bytemd/plugin-gfm";

  let value;

  const plugins = [gfm()];

  function handleChange(e) {
    value = e.detail.value;
  }
</script>

<div class="">
  <h2 class="text-lg font-bold text-primary">MarkDown Editor:</h2>
  <Editor {value} {plugins} on:change={handleChange} />
</div>
