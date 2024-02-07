

export const isExpired = (expiry: string): boolean => {
  const dateObj = new Date(expiry);
  const today = new Date();
  return dateObj < today;
}

export const getDate = (datetime: string): string => {
  const dateObj = new Date(datetime);
  const year = dateObj.getUTCFullYear();
  const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = dateObj.getUTCDate().toString().padStart(2, "0");

  return `${day}/${month}/${year}`;
}

export const generatePassword = async (length: number, upper: boolean, lower: boolean, numerical: boolean, special: boolean): Promise<string> => {
  if (!length) {
    length = 10;
  }

  // if no character types are specified, default to all
  if (!upper && !lower && !numerical && !special) {
    upper = true;
    lower = true;
    numerical = true;
    special = true;
  }

  // Define the character sets that can be used to create the password.
  let characters = "";

  // for each type that is true, add the characters to the character set
  // for each type that is true, add the characters to the character set
  if (upper) {
    characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }

  if (lower) {
    characters += "abcdefghijklmnopqrstuvwxyz";
  }

  if (numerical) {
    characters += "0123456789";
  }

  if (special) {
    characters += "!@#$%^&*()_+~`|}{[]:;?><,./-=";
  }

  // Create a new Uint8Array with the specified length.
  const buffer = new Uint8Array(length);

  // Get the browser's crypto object for generating random numbers.
  const crypto = window.crypto || (window as any).msCrypto; // For compatibility with IE11.

  // Generate random values and stores them in the buffer.
  const array = crypto.getRandomValues(buffer);

  // Initialize an empty string to hold the generated password.
  let password = "";

  // Iterate over the array of random values and add characters to the password.
  for (let i = 0; i < length; i++) {
    // Use the modulus operator to get a random index in the characters string
    // and add the corresponding character to the password.
    password += characters.charAt(array[i] % characters.length);
  }

  // Return the generated password.
  return password;
};