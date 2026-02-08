'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Crosshair,
  Lock,
  Eye,
  EyeOff,
  FileKey,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PqVault } from "@/lib/vault";
import { decryptWithAES, deriveKey, unwrapVaultKey } from "@/lib/crypto";

export default function VaultPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [keyfileName, setKeyfileName] = useState<string | null>(null);
  const [keyfile, setKeyfile] = useState<File | null>(null);
  const [vaultFile, setVaultFile] = useState<File | null>(null);
  const [decryptedMessage, setDecryptedMessage] = useState<string | null>(null);
  const { toast } = useToast();

  const handleDecryptVault = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const passwordInput = document.getElementById('passcode') as HTMLInputElement;
    const password = passwordInput.value;

    if (!password || !keyfile || !vaultFile) {
      toast({
        title: "Missing Credentials",
        description: "Please provide a password, keyfile, and vault file.",
        variant: "destructive",
      });
      return;
    }

    const passwordBytes = new TextEncoder().encode(password);
    const keyfileBytes = new Uint8Array(await keyfile.arrayBuffer());
    const vaultBytes = new Uint8Array(await vaultFile.arrayBuffer());

    try {
      // Decode the vault protobuf
      const vault = PqVault.decode(vaultBytes);

      // Re-derive the Argon2 key
      const { key: argon2Key } = await deriveKey(passwordBytes, vault.salt, keyfileBytes);

      // Decrypt the PQC private key
      const pqcPrivateKey = await decryptWithAES(argon2Key, vault.pqcPrivateKeyEnc, vault.argon2Iv);

      // Unwrap the Master Vault Key
      const masterVaultKey = await unwrapVaultKey(pqcPrivateKey, vault.pqcWrappedKey);

      // Decrypt the final payload
      const decryptedPayload = await decryptWithAES(masterVaultKey, vault.encryptedPayload, vault.payloadIv);

      setDecryptedMessage(new TextDecoder().decode(decryptedPayload));

      toast({
        title: "Vault Unlocked!",
        description: "The secret message has been revealed.",
      });

    } catch (error) {
      console.error("Vault decryption failed:", error);
      toast({
        title: "Decryption Error",
        description: "Failed to decrypt the vault. Please check your credentials and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center p-4 space-y-8 pt-8 pb-8"
      suppressHydrationWarning
    >
      <div className="flex flex-col items-center text-center">
        <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 shadow-[0_0_20px] shadow-primary/30">
          <Crosshair className="h-10 w-10 text-primary" />
        </div>
        <h1 className="mt-6 font-headline text-4xl font-bold tracking-widest text-foreground">
          UNSEAL THE TROLL VAULT
        </h1>
        <p className="mt-2 font-code text-sm tracking-[0.3em] text-muted-foreground">
          REVEAL THE SECRET
        </p>
      </div>

      {decryptedMessage ? (
        <div className="w-full max-w-sm p-6 bg-primary/10 border border-primary/20 rounded-lg shadow-[0_0_20px] shadow-primary/30">
          <h2 className="font-headline text-2xl font-bold text-center text-primary">SECRET MESSAGE</h2>
          <p className="mt-4 font-code text-lg text-center text-foreground">{decryptedMessage}</p>
        </div>
      ) : (
        <form className="w-full max-w-sm space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="passcode"
              className="font-code text-xs tracking-widest text-muted-foreground"
            >
              PASSCODE
            </Label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary" />
              <Input
                id="passcode"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••"
                required
                className="pl-12 h-14 pr-12 text-lg font-code bg-input border-0"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="keyfile"
              className="font-code text-xs tracking-widest text-muted-foreground"
            >
              HARDWARE TOKEN (.BIN)
            </Label>
            <div className="relative">
              <label htmlFor="keyfile" className="cursor-pointer">
                <div className="w-full h-32 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 text-muted-foreground hover:bg-input/80 hover:text-foreground transition-colors">
                  <FileKey className="h-8 w-8" />
                  <span className="mt-2 text-sm font-semibold">
                    {keyfileName || "SELECT .BIN FILE"}
                  </span>
                </div>
              </label>
              <Input
                id="keyfile"
                type="file"
                accept=".bin"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setKeyfileName(file.name);
                    setKeyfile(file);
                  }
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="vaultfile"
              className="font-code text-xs tracking-widest text-muted-foreground"
            >
              ENCRYPTED VAULT (.ENC)
            </Label>
            <div className="relative">
              <label htmlFor="vaultfile" className="cursor-pointer">
                <div className="w-full h-32 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 text-muted-foreground hover:bg-input/80 hover:text-foreground transition-colors">
                  <FileKey className="h-8 w-8" />
                  <span className="mt-2 text-sm font-semibold">
                    {vaultFile?.name || "SELECT .ENC FILE"}
                  </span>
                </div>
              </label>
              <Input
                id="vaultfile"
                type="file"
                accept=".enc"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setVaultFile(file);
                  }
                }}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-14 font-bold text-lg tracking-wider"
            onClick={handleDecryptVault}
          >
            DECRYPT AND REVEAL
          </Button>
        </form>
      )}
    </main>
  );
}
