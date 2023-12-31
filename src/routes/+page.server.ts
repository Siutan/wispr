import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (({ locals }) => {

  if (!locals.pb.authStore.isValid) {
    throw redirect(303, '/login?origin=/');
  } else {
    throw redirect(303, '/secrets');
  }
}) satisfies PageServerLoad;