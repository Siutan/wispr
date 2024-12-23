import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (({ locals }) => {

  if (!locals.pb.authStore.isValid) {
    redirect(303, '/login?origin=/');
  } else {
    redirect(303, '/secrets');
  }
}) satisfies PageServerLoad;