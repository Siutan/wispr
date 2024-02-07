<script>
  import { selectedRecord } from "$lib/stores/recordStore";
  import { pb } from "$lib/pocketbase.js";
  export let type = 'password' || 'markdown'

  // update the selected record with the new type
  async function updateType() {
    return await pb.collection('content').update($selectedRecord, { type: type })
  }

</script>

<select bind:value={type} on:change={updateType}>
  <option value="password">Password</option>
  <option value="markdown">Markdown</option>
</select>

