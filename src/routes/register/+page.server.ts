import { redirect } from "@sveltejs/kit";
import { PUBLIC_ALLOW_SIGNUP } from "$env/static/public";
import type { Actions } from "./$types";

export const actions: Actions = {
  default: async ({ locals, request }) => {
    const data = Object.fromEntries(await request.formData()) as {
      email: string
      password: string
      passwordConfirm: string
    };

    if (PUBLIC_ALLOW_SIGNUP !== "true") {
      throw redirect(303, "/login");
    }

    try {
      await locals.pb.collection("users").create(data);
      await locals.pb
        .collection("users")
        .authWithPassword(data.email, data.password);
    } catch (e) {
      console.error(e);
      throw e;
    }

    throw redirect(303, "/");
  }
};
