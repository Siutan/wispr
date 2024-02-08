import type { Record } from "pocketbase";

export type Category = {
  id: string;
  name: string;
  color: string;
  collectionId: string;
};
export function mapCategory(category: Record): Category {
  return {
    id: category.id,
    name: category.cat_name,
    color: category.cat_color,
    collectionId: category.collectionId,
  };
}