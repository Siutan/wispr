import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { pb } from "$lib/pocketbase";
import type { Record } from "pocketbase";

export const load: PageServerLoad = (async ({ locals }) => {
  if (!locals.pb.authStore.isValid) {
    throw redirect(303, "/login?origin=secret");
  }

  // call to api to get secrets
  const contentRecords = await pb.collection("content").getFullList({
    sort: "-created",
    expand: "category"
  });

  const categories = await pb.collection("categories").getFullList();

  // return data like:
  // {
  //   data: [
  //     {
  //       content
  //       category
  //     }
  //   ]
  // }

  return {
    records: JSON.parse(JSON.stringify(contentRecords)) as Record[],
    categories: JSON.parse(JSON.stringify(categories)) as Record[]
  };

}) satisfies PageServerLoad;
