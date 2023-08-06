import { pb } from "$lib/pocketbase";
import { decrypt } from "$lib/crypt";
import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = (async ({ params }) => {

  const id = params.id;
  const contentRecord = await pb.collection("content").getOne(id);

  const now = new Date();
  const expiry = new Date(contentRecord.expiry);

  if (expiry < now) {
    throw error(404, {
      message: "Not found"
    });
  } else if (!contentRecord) {
    throw error(404, {
      message: "Not found"
    });
  }

  if (contentRecord.type === "password") {
    contentRecord.password = await decrypt(contentRecord.password);
  } else if (contentRecord.type === "markdown") {
    contentRecord.markdown = await decrypt(contentRecord.markdown);
  }

  return {
    record: JSON.parse(JSON.stringify(contentRecord))
  };
}) satisfies PageServerLoad;
