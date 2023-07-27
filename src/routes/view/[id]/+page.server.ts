import { pb } from "$lib/pocketbase";
import { decrypt } from "$lib/crypt";
import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = (async ({ params }) => {

  const id = params.id;
  const contentRecord = await pb.collection("content").getOne(id);

  if (!contentRecord) {
    throw error(404, {
      message: 'Not found'
    });
  }

  if (contentRecord.expiry < new Date()) {
    return {
      status: 404,
      error: new Error("Record expired")
    }
  } else if (!contentRecord) {
    return {
      status: 404,
      error: new Error("Record not found")
    }
  }

  if (contentRecord.type === "password") {
    contentRecord.password = await decrypt(contentRecord.password);
  } else if (contentRecord.type === "markdown") {
    contentRecord.markdown = await decrypt(contentRecord.markdown);
  }

  return {
    record: JSON.parse(JSON.stringify(contentRecord))
  }
}) satisfies PageServerLoad;
