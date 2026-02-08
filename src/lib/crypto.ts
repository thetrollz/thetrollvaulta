import { Kyber } from "pqc-kyber";
import argon2 from "argon2-browser";

// AES-256-GCM Encryption
export async function encryptWithAES(key: Uint8Array, data: Uint8Array): Promise<{ iv: Uint8Array; ciphertext: Uint8Array }> {
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const cryptoKey = await window.crypto.subtle.importKey(
    "raw",
    key,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt"]
  );
  const ciphertext = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    cryptoKey,
    data
  );
  return { iv, ciphertext: new Uint8Array(ciphertext) };
}

// AES-256-GCM Decryption
export async function decryptWithAES(key: Uint8Array, ciphertext: Uint8Array, iv: Uint8Array): Promise<Uint8Array> {
  const cryptoKey = await window.crypto.subtle.importKey(
    "raw",
    key,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"]
  );
  const decrypted = await window.crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    cryptoKey,
    ciphertext
  );
  return new Uint8Array(decrypted);
}

// Argon2id Key Derivation
export async function deriveKey(password: Uint8Array, salt: Uint8Array, keyfile: Uint8Array): Promise<{ key: Uint8Array }> {
  const argon2Options = {
    pass: password,
    salt: salt,
    time: 1,
    mem: 32 * 1024,
    hashLen: 32,
    parallelism: 1,
    type: argon2.ArgonType.Argon2id,
    ad: keyfile, // Use keyfile as associated data
  };
  // The argon2-browser library has a slightly different return type than the standard argon2 library.
  // It returns an object with a `hash` property, which is a Uint8Array.
  const result = await argon2.hash(argon2Options);
  return { key: result.hash };
}

// PQC Key Generation and Wrapping (ML-KEM-768)
export async function generateAndWrapVaultKey(): Promise<{ masterVaultKey: Uint8Array; pqcPrivateKey: Uint8Array; pqcWrappedKey: Uint8Array }> {
  const kyber = new Kyber("Kyber768");
  const [pqcPublicKey, pqcPrivateKey] = await kyber.generateKeyPair();
  const { ciphertext: pqcWrappedKey, sharedSecret: masterVaultKey } = await kyber.encrypt(pqcPublicKey);
  return { masterVaultKey, pqcPrivateKey, pqcWrappedKey };
}

// PQC Key Unwrapping (ML-KEM-768)
export async function unwrapVaultKey(pqcPrivateKey: Uint8Array, pqcWrappedKey: Uint8Array): Promise<Uint8Array> {
  const kyber = new Kyber("Kyber768");
  const masterVaultKey = await kyber.decrypt(pqcPrivateKey, pqcWrappedKey);
  return masterVaultKey;
}
