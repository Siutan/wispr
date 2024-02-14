import { get, writable } from "svelte/store";
import type { RecordDetails } from "$lib/types/record";
import { currentUser } from "$lib/pocketbase";

export const selectedRecord = writable<string>("");
export const recordDetails = writable<RecordDetails>();

export const recordList = writable<RecordDetails[]>([]);

// reset function to reset the store
export function resetRecordStore() {
  selectedRecord.set("");
  recordDetails.set({});
}

export const newRecord: RecordDetails = {
  user: get(currentUser)?.id,
  name: "New Record",
  type: "password",
  expiry: new Date().toISOString(),
  category: "e5lmrwfkpo0q69l",
};