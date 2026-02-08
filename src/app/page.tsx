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
} from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center p-4 space-y-8"
      suppressHydrationWarning
    >
      <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 shadow-[0_0_20px] shadow-primary/30">
        <Crosshair className="h-10 w-10 text-primary" />
      </div>

      <div className="text-center">
        <h1 className="font-headline text-4xl font-bold tracking-widest text-foreground">
          THE TROLL VAULT
        </h1>
        <p className="mt-2 font-code text-sm tracking-[0.3em] text-muted-foreground">
          AUTHENTICATED ACCESS
        </p>
      </div>

      <div className="w-full max-w-sm space-y-8">
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
              className="pl-12 h-14 pr-12 text-lg font-code bg-input border-border"
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
          <Label className="font-code text-xs tracking-widest text-muted-foreground">
            HARDWARE TOKEN REQUIRED
          </Label>
          <div className="relative flex flex-col items-center justify-center w-full h-32 rounded-lg border-2 border-dashed border-border/50 bg-input/50 hover:border-primary/50 hover:bg-primary/10 transition-colors cursor-pointer">
            <FileKey className="h-8 w-8 text-muted-foreground" />
            <span className="mt-2 text-sm font-code text-muted-foreground">
              SELECT .BIN FILE
            </span>
            <Input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
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

      <div className="absolute bottom-8 text-center">
        <Button
          variant="link"
          className="text-muted-foreground/50 hover:text-muted-foreground text-xs"
        >
          <RefreshCw className="mr-2 h-3 w-3" />
          FACTORY DATA RESET
        </Button>
      </div>
    </main>
  );
}
