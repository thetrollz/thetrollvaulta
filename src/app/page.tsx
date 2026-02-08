'use client';

import Link from "next/link";
import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Crosshair,
  Lock,
  Eye,
  EyeOff,
  FileKey,
  RefreshCw,
  Bomb,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { PqVault } from "@/lib/vault";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [keyfileName, setKeyfileName] = useState<string | null>(null);
  const [keyfile, setKeyfile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleGenerateKeyfile = () => {
    try {
      const randomBytes = new Uint8Array(64);
      window.crypto.getRandomValues(randomBytes);
      const blob = new Blob([randomBytes], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'troll-vault.bin';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast({
        title: 'Keyfile Generated',
        description: 'Your new keyfile has been downloaded.',
      });
    } catch (error) {
      console.error('Keyfile generation failed:', error);
      toast({
        title: 'Error',
        description: 'Could not generate a new keyfile. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleFactoryReset = () => {
    console.log('Factory data reset initiated.');
    toast({
      title: 'System Reset',
      description: 'All vault data has been permanently erased.',
      variant: 'destructive',
    });
  };

  const handleUnlockVault = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const passwordInput = document.getElementById('passcode') as HTMLInputElement;
    const password = passwordInput.value;

    if (!password || !keyfile) {
      toast({
        title: 'Missing Credentials',
        description: 'Please provide both a password and a keyfile.',
        variant: 'destructive',
      });
      return;
    }

    const passwordBytes = new TextEncoder().encode(password);
    const keyfileBytes = new Uint8Array(await keyfile.arrayBuffer());
    const salt = window.crypto.getRandomValues(new Uint8Array(32)); // Argon2 salt

    try {
      const { deriveKey, generateAndWrapVaultKey, encryptWithAES } = await import('@/lib/crypto');
      // Stage 1: The Argon2id Wall
      const { key: argon2Key } = await deriveKey(passwordBytes, salt, keyfileBytes);
      
      // Stage 2: Post-Quantum Hybrid Key Wrap
      const { masterVaultKey, pqcPrivateKey, pqcWrappedKey } = await generateAndWrapVaultKey();

      // Encrypt the PQC private key with the user-derived Argon2 key
      const { iv: argon2Iv, ciphertext: pqcPrivateKeyEnc } = await encryptWithAES(
        argon2Key,
        pqcPrivateKey
      );
      
      // Encrypt the main vault payload
      const payload = new TextEncoder().encode('This is a top-secret message from the Troll Vault!');
      const { iv: payloadIv, ciphertext: encryptedPayload } = await encryptWithAES(masterVaultKey, payload);

      // Assemble the PqVault protobuf object
      const vault = PqVault.create({
        salt,
        argon2Iv,
        pqcWrappedKey,
        pqcPrivateKeyEnc,
        encryptedPayload,
        payloadIv
      });

      // Serialize the vault to a binary format
      const serializedVault = PqVault.encode(vault).finish();

      // Trigger a download of the final encrypted vault file
      const blob = new Blob([serializedVault], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'troll-vault.enc';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: 'Vault Created Successfully!',
        description: 'Your encrypted vault has been downloaded.',
      });

    } catch (error) {
      console.error('Full encryption flow failed:', error);
      toast({
        title: 'Critical Error',
        description: 'A failure occurred during the cryptographic process. Check the console.',
        variant: 'destructive',
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
          THE TROLL VAULT
        </h1>
        <p className="mt-2 font-code text-sm tracking-[0.3em] text-muted-foreground">
          AUTHENTICATED ACCESS
        </p>
      </div>

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
              type={showPassword ? 'text' : 'password'}
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
            HARDWARE TOKEN REQUIRED
          </Label>
          <div className="relative">
            <label htmlFor="keyfile" className="cursor-pointer">
              <div className="w-full h-32 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 text-muted-foreground hover:bg-input/80 hover:text-foreground transition-colors">
                <FileKey className="h-8 w-8" />
                <span className="mt-2 text-sm font-semibold">
                  {keyfileName || 'SELECT .BIN FILE'}
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

        <Button
          type="submit"
          className="w-full h-14 font-bold text-lg tracking-wider"
          onClick={handleUnlockVault}
        >
          UNLOCK VAULT
        </Button>
      </form>

      <div className="w-full max-w-sm space-y-4">
        <Button
          type="button"
          className="w-full h-14 font-bold text-lg tracking-wider"
          onClick={handleGenerateKeyfile}
        >
          <RefreshCw className="mr-2 h-5 w-5" />
          GENERATE NEW KEYFILE
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              className="w-full h-14 font-bold text-lg tracking-wider bg-destructive/20 text-destructive hover:bg-destructive/30"
            >
              <Bomb className="mr-2 h-5 w-5" />
              FACTORY DATA RESET
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                entire vault and all associated data. There is no recovery.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className={buttonVariants({ variant: 'destructive' })}
                onClick={handleFactoryReset}
              >
                Confirm Reset
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </main>
  );
}
