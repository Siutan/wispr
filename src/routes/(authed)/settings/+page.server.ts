import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = (async ({ locals }) => {
  if (!locals.pb.authStore.isValid) {
    throw redirect(303, "/login?origin=settings");
  }
}) satisfies PageServerLoad;

export const actions: Actions = {
  deleteAccount: async ({ locals }) => {
    const user = locals.pb.authStore.model;
    if (user) {
      await user.delete();
      locals.pb.authStore.clear()
      locals.user = null
      throw redirect(303, "/login");
    }
  }
}