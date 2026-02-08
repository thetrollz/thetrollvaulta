import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Key, User, Lock } from "lucide-react";
import { TrollVaultLogo } from "@/components/troll-vault-logo";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 crt">
      <div className="w-full max-w-md">
        <Card className="border-primary/50 bg-card/80 backdrop-blur-sm">
          <CardHeader className="items-center text-center">
            <TrollVaultLogo />
            <CardTitle className="font-headline text-4xl text-primary">
              The Troll Vault
            </CardTitle>
            <CardDescription className="font-code text-muted-foreground">
              SECURE. ANONYMOUS. YOURS.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="username"
                    placeholder="enter-username"
                    required
                    className="pl-10 font-code"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    className="pl-10 font-code"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <Button type="submit" className="w-full font-bold" asChild>
                <Link href="/dashboard">Login</Link>
              </Button>
              <Button
                variant="outline"
                className="w-full border-primary/50 text-primary hover:bg-primary/90 hover:text-primary-foreground"
              >
                <Key className="mr-2 h-4 w-4" />
                Authenticate with Key File
              </Button>
            </div>
            <div className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="#" className="font-bold text-primary hover:underline">
                Sign Up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
