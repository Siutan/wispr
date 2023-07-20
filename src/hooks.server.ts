import { pb } from "$lib/pocketbase";
import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { themes } from "$lib/themes";

export const pbHandle: Handle = async ({ event, resolve }) => {
  // before
  pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '')
  if (pb.authStore.isValid) {
    try {
      await pb.collection('users').authRefresh()
    } catch (_) {
      pb.authStore.clear()
    }
  }

  event.locals.pb = pb
  event.locals.user = structuredClone(pb.authStore.model)

  const response = await resolve(event)

  // after
  response.headers.set(
    'set-cookie',
    pb.authStore.exportToCookie({ httpOnly: false })
  )

  return response
}

export const themeHandle: Handle = async ({ event, resolve }) => {
  const theme = event.cookies.get('theme')

  if (!theme || !themes.includes(theme)) {
    return await resolve(event)
  }

  return await resolve(event, {
    transformPageChunk: ({ html }) => {
      return html.replace('data-theme=""', `data-theme="${theme}"`)
    },
  })
}


export const handle: Handle = sequence(pbHandle, themeHandle);