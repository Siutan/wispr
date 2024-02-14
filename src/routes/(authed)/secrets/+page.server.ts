import { redirect } from "@sveltejs/kit";
import { pb } from "$lib/pocketbase";
import type { PageServerLoad } from "./$types";
import { mapRecordDetails } from "$lib/types/record";
import { recordList} from "$lib/stores/recordStore";

export const load: PageServerLoad = (async ({ locals }) => {
  if (!locals.pb.authStore.isValid) {
    throw redirect(303, "/login?origin=secret");
  }

  const contentRecords = await pb.collection("content").getFullList({
    sort: "-created",
    expand: "category"
  });
  const records = contentRecords.map(mapRecordDetails);

  return {
    records
  };

}) satisfies PageServerLoad;
