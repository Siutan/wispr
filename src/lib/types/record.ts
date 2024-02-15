import { decrypt } from "$lib/crypt";

export interface RecordDetails {
  id: string;
  name: string;
  type: "password" | "markdown";
  password: string;
  markdown: string;
  categoryId: string;
  categoryName: string;
  categoryColor: string;
  is_active: boolean;
  created: string;
  updated: string;
  expiry: string;
}

export const mapRecordDetails = (data: any): RecordDetails => {
  const decryptedPassword = data.type === "password" ? decrypt(data.password) : "";
  return {
    id: data.id,
    name: data.name,
    type: data.type,
    password: decryptedPassword,
    markdown: data.markdown,
    categoryId: data.category,
    categoryName: data.expand.category.cat_name,
    categoryColor: data.expand.category.cat_color,
    is_active: data.is_active,
    created: data.created,
    updated: data.updated,
    expiry: data.expiry
  };
};