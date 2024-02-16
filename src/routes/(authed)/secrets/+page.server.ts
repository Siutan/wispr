import { redirect } from "@sveltejs/kit";
import { pb } from "$lib/pocketbase";
import type { PageServerLoad } from "./$types";
import { mapRecordDetails } from "$lib/types/record";
import { mapCategory } from "$lib/types/category";

export const load: PageServerLoad = (async ({ locals }) => {
  if (!locals.pb.authStore.isValid) {
    throw redirect(303, "/login?origin=secret");
  }

  return {
    records: await getRecords(),
    categories: await getCategories()
  };

}) satisfies PageServerLoad;

async function getRecords() {
  const contentRecords = await pb.collection("content").getFullList({
    sort: "-created",
    expand: "category"
  });

  return contentRecords.map(mapRecordDetails);
}

async function getCategories() {
  const categoryRecords = await pb.collection("categories").getFullList();

  return categoryRecords.map(mapCategory);
}
