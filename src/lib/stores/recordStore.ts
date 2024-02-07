import { type Writable, writable } from "svelte/store";

export const selectedRecord: Writable<string> = writable('');

