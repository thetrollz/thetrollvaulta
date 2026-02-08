"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Crosshair,
  Lock,
  Eye,
  EyeOff,
  FileKey,
  RefreshCw,
  Sparkles,
} from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [keyfileName, setKeyfileName] = useState<string | null>(null);


  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center p-4"
      suppressHydrationWarning
    >
      <div className="flex flex-col items-center text-center mb-8">
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

      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Unlock Vault</CardTitle>
          <CardDescription>Enter your passcode and select your hardware token.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="passcode"
              className="font-code text-xs tracking-widest text-muted-foreground"
            >
              PASSCODE
            </Label>
            <div className="relative" suppressHydrationWarning>
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
             <Label
              htmlFor="keyfile"
              className="font-code text-xs tracking-widest text-muted-foreground"
            >
              HARDWARE TOKEN
            </Label>
             <div className="relative">
              <Button asChild variant="outline" className="w-full h-14 justify-start text-muted-foreground font-normal">
                <label htmlFor="keyfile" className="cursor-pointer">
                  <FileKey className="mr-3 h-5 w-5 text-primary" />
                  <span>{keyfileName || "Select .bin file..."}</span>
                </label>
              </Button>
              <Input
                id="keyfile"
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={(e) => setKeyfileName(e.target.files?.[0]?.name || null)}
              />
            </div>
             <Button variant="link" className="px-0 h-auto py-1 text-xs">
                <Sparkles className="mr-2 h-3 w-3" />
                Generate New Keyfile
              </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button
            type="submit"
            className="w-full h-14 font-bold text-lg tracking-wider"
            asChild
          >
            <Link href="/dashboard">UNLOCK VAULT</Link>
          </Button>
        </CardFooter>
      </Card>
      
      <div className="absolute bottom-8 text-center">
         <Button
            variant="link"
            className="h-auto p-0 text-destructive/80 hover:text-destructive text-sm font-bold tracking-wider"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Factory Data Reset
          </Button>
      </div>

    </main>
  );
}
