import { pb } from "$lib/pocketbase";
import { decrypt } from "$lib/crypt";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = (async ({ params }) => {
  // get the id from the url
  const id = params.id;
  // call to api to get secrets
  const contentRecord = await pb.collection("content").getOne(id);

  //check if the record is expired
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
    // decrypt the password
    contentRecord.password = await decrypt(contentRecord.password);
    console.log("decrypted password:", contentRecord.password);
  } else if (contentRecord.type === "markdown") {
    contentRecord.markdown = await decrypt(contentRecord.markdown);
  }

  return {
    record: JSON.parse(JSON.stringify(contentRecord))
  }
}) satisfies PageServerLoad;
