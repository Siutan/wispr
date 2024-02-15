import { PUBLIC_SECRET_KEY } from "$env/static/public";
import CryptoJS from "crypto-js";

export const encrypt = (value: string) => {
  try {
    const encrypted = CryptoJS.AES.encrypt(value, PUBLIC_SECRET_KEY);
    return encrypted.toString();
  } catch (error) {
    console.error("Encryption error:", error);
    return "Encryption failed. Please try again.";
  }
};

export const decrypt = (value: string) => {
  try {
    const decrypted = CryptoJS.AES.decrypt(value, PUBLIC_SECRET_KEY);
    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error("Decryption error:", error);
    return "Decryption failed. Please check the input value.";
  }
};