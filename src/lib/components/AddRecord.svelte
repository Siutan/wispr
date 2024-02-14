<script lang="ts">
  import { pb} from "$lib/pocketbase";
  import { recordList, newRecord } from "$lib/stores/recordStore";
  import { mapRecordDetails } from "$lib/types/record";

  async function addNew() {
    const record = await pb.collection("content").create(newRecord, { expand: "category" })
    recordList.update((records) => {
      // push to front of array
      records.unshift(mapRecordDetails(record));
      return records;
    });
  }
</script>

<button class="btn btn-primary btn-md" on:click={addNew}>Add New</button>