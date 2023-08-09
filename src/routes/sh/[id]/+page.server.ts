import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { pb } from "$lib/pocketbase";

export const load = (async ({ locals, params }) => {
  if (!locals.pb.authStore.isValid) {
    throw redirect(303, "/login?origin=utils");
  }

  const id = params.id;

  const record = await pb.collection("urls").getOne(id);

  const redirectUrl = record.url;

  throw redirect(303, redirectUrl);
}) satisfies PageServerLoad;