// AES-256-GCM Encryption
export async function encryptWithAES(key: Uint8Array, data: Uint8Array): Promise<{ iv: Uint8Array; ciphertext: Uint8Array }> {
  if (typeof window === 'undefined') {
    throw new Error("encryptWithAES can only be called in a browser environment.");
  }
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
  if (typeof window === 'undefined') {
    throw new Error("decryptWithAES can only be called in a browser environment.");
  }
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
  if (typeof window === 'undefined') {
    throw new Error("deriveKey can only be called in a browser environment.");
  }
  const argon2 = await import('argon2-browser');
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
  const result = await argon2.hash(argon2Options);
  return { key: result.hash };
}

// PQC Key Generation and Wrapping (ML-KEM-768)
export async function generateAndWrapVaultKey(): Promise<{ masterVaultKey: Uint8Array; pqcPrivateKey: Uint8Array; pqcWrappedKey: Uint8Array }> {
  if (typeof window === 'undefined') {
    throw new Error("generateAndWrapVaultKey can only be called in a browser environment.");
  }
  const { Kyber } = await import('pqc-kyber');
  const kyber = new Kyber("Kyber768");
  const [pqcPublicKey, pqcPrivateKey] = await kyber.generateKeyPair();
  const { ciphertext: pqcWrappedKey, sharedSecret: masterVaultKey } = await kyber.encrypt(pqcPublicKey);
  return { masterVaultKey, pqcPrivateKey, pqcWrappedKey };
}

// PQC Key Unwrapping (ML-KEM-768)
export async function unwrapVaultKey(pqcPrivateKey: Uint8Array, pqcWrappedKey: Uint8Array): Promise<Uint8Array> {
  if (typeof window === 'undefined') {
    throw new Error("unwrapVaultKey can only be called in a browser environment.");
  }
  const { Kyber } = await import('pqc-kyber');
  const kyber = new Kyber("Kyber768");
  const masterVaultKey = await kyber.decrypt(pqcPrivateKey, pqcWrappedKey);
  return masterVaultKey;
}
