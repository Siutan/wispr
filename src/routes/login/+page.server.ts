import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
  default: async ({ locals, request }) => {
    const data = Object.fromEntries(await request.formData()) as {
      email: string
      password: string
    }

    try {
      await locals.pb
        .collection('users')
        .authWithPassword(data.email, data.password)

    } catch (_) {
      console.error(_)
      return fail(400, { error: 'Invalid Email or Password.', success: false, email: data.email })
    }

    throw redirect(303, '/secrets')
  },
}
