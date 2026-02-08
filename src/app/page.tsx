"use client";

import Link from "next/link";
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
  RefreshCw,
  Bomb,
} from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [keyfileName, setKeyfileName] = useState<string | null>(null);

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

      <div className="w-full max-w-sm space-y-6">
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
            HARDWARE TOKEN REQUIRED
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
              onChange={(e) => setKeyfileName(e.target.files?.[0]?.name || null)}
            />
          </div>
        </div>
        
        <Button
          type="submit"
          className="w-full h-14 font-bold text-lg tracking-wider"
          asChild
        >
          <Link href="/dashboard">UNLOCK VAULT</Link>
        </Button>
      </div>
      
      <div className="w-full max-w-sm space-y-4">
        <Button
          type="button"
          className="w-full h-14 font-bold text-lg tracking-wider"
        >
          <RefreshCw className="mr-2 h-5 w-5" />
          GENERATE NEW KEYFILE
        </Button>
        <Button
          variant="destructive"
          className="w-full h-14 font-bold text-lg tracking-wider bg-destructive/20 text-destructive hover:bg-destructive/30"
        >
          <Bomb className="mr-2 h-5 w-5" />
          FACTORY DATA RESET
        </Button>
      </div>
    </main>
  );
}
