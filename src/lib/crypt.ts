import { SECRET_KEY } from "$env/static/private";
import CryptoJS from "crypto-js";

export const encrypt = async (value: string) => {
  try {
    const encrypted = CryptoJS.AES.encrypt(value, SECRET_KEY);
    return encrypted.toString();
  } catch (error) {
    console.error("Encryption error:", error);
    return "Encryption failed. Please try again.";
  }
};

export const decrypt = async (value: string) => {
  try {
    const decrypted = CryptoJS.AES.decrypt(value, SECRET_KEY);
    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error("Decryption error:", error);
    return "Decryption failed. Please check the input value.";
  }
};