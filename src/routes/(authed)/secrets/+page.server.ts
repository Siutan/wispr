import { redirect } from "@sveltejs/kit";
import { pb } from "$lib/pocketbase";
import { decrypt, encrypt } from "$lib/crypt";
import type { Actions, PageServerLoad } from "./$types";
import type { Record } from "pocketbase";

export const load: PageServerLoad = (async ({ locals }) => {
  if (!locals.pb.authStore.isValid) {
    throw redirect(303, "/login?origin=secret");
  }

  // call to api to get secrets
  const contentRecords = await pb.collection("content").getFullList({
    sort: "-created",
    expand: "category"
  });

  // decrypt all the passwords or markdown
  for (const record of contentRecords) {
    if (record.password) {
      record.password = await decrypt(record.password);
    }
    if (record.markdown) {
      record.markdown = await decrypt(record.markdown);
    }
  }

  const categories = await pb.collection("categories").getFullList();

  return {
    records: JSON.parse(JSON.stringify(contentRecords)) as Record[],
    categories: JSON.parse(JSON.stringify(categories)) as Record[]
  };

}) satisfies PageServerLoad;


export const actions: Actions = {
  save: async ({ locals, request }) => {
    const data = Object.fromEntries(await request.formData()) as {
      itemId: string;
      catSelect: string;
      nameInput: string;
      typeSelect: string;
      passwordInput: string;
      markdownInput: string;
      fileInput: string;
    };

    const user = locals.pb.authStore.model;

    const sendData = {
      user: user?.id,
      name: data.nameInput,
      type: data.typeSelect,
      password: await encrypt(data.passwordInput) || "",
      markdown: data.markdownInput ? await encrypt(data.markdownInput) : "",
      file: data.fileInput || "",
      category: data.catSelect
    };


    // update record with new data
    try {
      await pb.collection("content").update(data.itemId, sendData);
    } catch (e: unknown) {
      console.log(e);
    }
  },
  launch: async ({ locals, request }) => {
    const data = Object.fromEntries(await request.formData()) as {
      itemId: string;
      catSelect: string;
      nameInput: string;
      typeSelect: string;
      passwordInput: string;
      markdownInput: string;
      fileInput: string;
      expirySelect: string;
      extendCheckbox: string;
    };
    // get the record
    const record = await pb.collection("content").getOne(data.itemId);

    const getExpiry = (expiry: string, extend: string) => {
      // return expiry date in 2022-01-01 10:00:00.123Z format
      // get current record expiry
      const currentExpiry = record.expiry;
      if (extend === "on") {
        // add the length to the current expiry
        const newExpiry = new Date(currentExpiry);
        newExpiry.setHours(newExpiry.getHours() + parseInt(expiry));
        return newExpiry.toISOString();
      } else if (!data.expirySelect) {
        // if no expiry is set, return the current expiry
        return currentExpiry;
      }
      // return the current expiry + the length
      const currentDate = new Date();
      currentDate.setHours(currentDate.getHours() + parseInt(expiry));
      return currentDate.toISOString();
    };

    const user = locals.pb.authStore.model;

    const sendData = {
      user: user?.id,
      name: data.nameInput,
      type: data.typeSelect,
      password: await encrypt(data.passwordInput) || "",
      markdown: data.markdownInput ? await encrypt(data.markdownInput) : "",
      file: data.fileInput || "",
      category: data.catSelect,
      expiry: getExpiry(data.expirySelect, data.extendCheckbox),
      is_active: true
    };


    // update record with new data
    try {
      await pb.collection("content").update(data.itemId, sendData);
    } catch (e: unknown) {
      console.log(e);
    }
  },
  stop: async ({ request }) => {
    const data = Object.fromEntries(await request.formData()) as {
      itemId: string;
    };

    const sendData = {
      expiry: new Date().toISOString(),
      is_active: false
    };

    // update record with new data
    try {
      await pb.collection("content").update(data.itemId, sendData);
    } catch (e: unknown) {
      console.log(e);
    }

  },
  delete: async ({ request }) => {
    const data = Object.fromEntries(await request.formData()) as {
      itemId: string;
    };

    // get the record
    try {
      await pb.collection("content").delete(data.itemId);
    } catch (e: unknown) {
      console.log(e);
    }
  }
};