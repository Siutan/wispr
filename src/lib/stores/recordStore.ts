import { writable } from "svelte/store";
import type { RecordDetails } from "$lib/types/record";

export const selectedRecord = writable<string>("");
export const recordDetails = writable<RecordDetails>();

// reset function to reset the store
export function resetRecordStore() {
  selectedRecord.set("");
  recordDetails.set({});
}