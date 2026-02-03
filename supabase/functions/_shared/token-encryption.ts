/**
 * Token encryption/decryption utilities using AES-256-GCM
 * 
 * Tokens are stored in format: iv:ciphertext (all hex-encoded)
 * The ciphertext includes the 16-byte authentication tag appended by AES-GCM
 */

const ENCRYPTION_KEY = Deno.env.get("TOKEN_ENCRYPTION_KEY");

/**
 * Encrypt a token using AES-256-GCM
 */
export async function encryptToken(plaintext: string): Promise<string> {
  if (!ENCRYPTION_KEY) {
    throw new Error("TOKEN_ENCRYPTION_KEY is not configured");
  }

  // Decode the hex key (must be 32 bytes = 64 hex chars for AES-256)
  const keyBytes = hexToBytes(ENCRYPTION_KEY);
  if (keyBytes.length !== 32) {
    throw new Error("TOKEN_ENCRYPTION_KEY must be 64 hex characters (32 bytes)");
  }

  // Create a new ArrayBuffer from the key bytes to satisfy TypeScript
  const keyBuffer = new ArrayBuffer(keyBytes.length);
  new Uint8Array(keyBuffer).set(keyBytes);

  // Import the key for AES-GCM
  const key = await crypto.subtle.importKey(
    "raw",
    keyBuffer,
    { name: "AES-GCM" },
    false,
    ["encrypt"]
  );

  // Generate random IV (12 bytes recommended for AES-GCM)
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ivBuffer = new ArrayBuffer(iv.length);
  new Uint8Array(ivBuffer).set(iv);

  // Encode plaintext to bytes
  const plaintextBytes = new TextEncoder().encode(plaintext);

  // Encrypt (result includes ciphertext + 16-byte auth tag)
  const ciphertext = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv: ivBuffer },
    key,
    plaintextBytes
  );

  // Format: iv:ciphertext+tag (all hex)
  return `${bytesToHex(iv)}:${bytesToHex(new Uint8Array(ciphertext))}`;
}

/**
 * Decrypt a token encrypted with encryptToken
 */
export async function decryptToken(encrypted: string): Promise<string> {
  if (!ENCRYPTION_KEY) {
    throw new Error("TOKEN_ENCRYPTION_KEY is not configured");
  }

  const keyBytes = hexToBytes(ENCRYPTION_KEY);
  if (keyBytes.length !== 32) {
    throw new Error("TOKEN_ENCRYPTION_KEY must be 64 hex characters (32 bytes)");
  }

  // Parse the encrypted format
  const parts = encrypted.split(":");
  if (parts.length !== 2) {
    throw new Error("Invalid encrypted token format");
  }

  const [ivHex, ciphertextHex] = parts;
  const ivBytes = hexToBytes(ivHex);
  const ciphertextBytes = hexToBytes(ciphertextHex);

  // Create ArrayBuffers from bytes
  const keyBuffer = new ArrayBuffer(keyBytes.length);
  new Uint8Array(keyBuffer).set(keyBytes);

  const ivBuffer = new ArrayBuffer(ivBytes.length);
  new Uint8Array(ivBuffer).set(ivBytes);

  const ciphertextBuffer = new ArrayBuffer(ciphertextBytes.length);
  new Uint8Array(ciphertextBuffer).set(ciphertextBytes);

  // Import the key
  const key = await crypto.subtle.importKey(
    "raw",
    keyBuffer,
    { name: "AES-GCM" },
    false,
    ["decrypt"]
  );

  // Decrypt
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: ivBuffer },
    key,
    ciphertextBuffer
  );

  return new TextDecoder().decode(decrypted);
}

/**
 * Check if a value appears to be encrypted (has our format)
 */
export function isEncrypted(value: string): boolean {
  if (!value) return false;
  const parts = value.split(":");
  // Our format: iv:ciphertext (both hex)
  // iv is 12 bytes = 24 hex chars
  // ciphertext+tag is at least 16 bytes = 32 hex chars
  return parts.length === 2 && 
         parts[0].length === 24 && 
         /^[0-9a-f]+$/i.test(parts[0]) &&
         parts[1].length >= 32 &&
         /^[0-9a-f]+$/i.test(parts[1]);
}

// Helper functions
function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes;
}

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}
