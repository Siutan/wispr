import { redirect } from '@sveltejs/kit'
import type { PageServerLoad, Actions } from "./$types";
import { pb } from "$lib/pocketbase";
import type { Record } from "pocketbase";

export const load = (({ locals }) => {
  if (!locals.pb.authStore.isValid) {
    throw redirect(303, '/login?origin=utils')
  }
}) satisfies PageServerLoad

export const actions: Actions = {
  shorten: async ({ locals, request }) => {
    const data = Object.fromEntries(await request.formData()) as {
      url: string
    }

    console.log(data)

    const user = locals.pb.authStore.model

    const sendData = {
      user: user?.id,
      url: data.url
    }

    const response = await pb.collection('urls').create(sendData);
    return {
      success: true,
      data: structuredClone(response)
    }
  }
}