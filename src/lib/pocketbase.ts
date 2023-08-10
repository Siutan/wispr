import { PUBLIC_POCKETBASE_URL } from '$env/static/public'
import PocketBase from "pocketbase";
import { writable } from 'svelte/store'

export const pb = new PocketBase(PUBLIC_POCKETBASE_URL)

export const currentUser = writable(pb.authStore.model)


export const apiRoutes = {
  profileImg: () => {
    const user = pb.authStore.model
    return `${PUBLIC_POCKETBASE_URL}/api/files/${user?.collectionId}/${user?.id}/${user?.avatar}`
  },
  Username: () => {
    const user = pb.authStore.model
    return `${user?.username}`
  },
}