import { pb } from "$lib/pocketbase";

export function getCategories() {
  return pb.collection("categories").getFullList();
}