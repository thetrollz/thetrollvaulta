"use client";

import { useState } from "react";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Bomb,
  LogOut,
  Plus,
  Search,
  ShieldCheck,
  ShieldOff,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";

export default function DashboardPage() {
  const [privacyMode, setPrivacyMode] = useState(false);

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto space-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/20 rounded-xl">
            <ShieldCheck className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wider text-foreground">THE TROLL VAULT</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
              <p className="text-xs font-semibold tracking-widest text-primary">SECURE OPERATIONAL</p>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <LogOut className="h-6 w-6 text-muted-foreground" />
        </Button>
      </header>

      <div className="grid grid-cols-2 gap-4">
        <Button
          variant={!privacyMode ? "default" : "secondary"}
          onClick={() => setPrivacyMode(!privacyMode)}
          className="py-6 text-base font-bold"
        >
          <ShieldOff className="mr-2 h-5 w-5" />
          PRIVACY {privacyMode ? "ON" : "OFF"}
        </Button>
        <Button variant="secondary" className="py-6 text-base font-bold">
          <SlidersHorizontal className="mr-2 h-5 w-5" />
          SYSTEM OPS
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search Vault Sector..."
          className="pl-12 h-14 text-base bg-card border-0"
        />
      </div>

      <main className="flex-grow space-y-3">
        <Card className="bg-card border-0">
          <CardContent className="flex items-center justify-between p-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 rounded-lg">
                <AvatarFallback className="text-xl font-bold rounded-lg bg-secondary text-foreground">H</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-bold">hdhdhd</p>
                <p className="text-sm text-muted-foreground">hdjdjd</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs font-semibold border-transparent">2FA</Badge>
              <Badge variant="outline" className="text-primary border-primary/50 bg-primary/10">
                KEY
              </Badge>
              <Button variant="ghost" size="icon" className="text-destructive/80 hover:text-destructive hover:bg-destructive/10 rounded-full">
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="space-y-3 pt-4">
        <Button className="w-full py-7 text-base font-bold">
          <Plus className="mr-2 h-5 w-5" />
          ADD NEW SECRET
        </Button>
        <Button variant="outline" className="w-full py-7 text-base font-bold border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive">
          <Bomb className="mr-2 h-5 w-5" />
          NUCLEAR TERMINATE
        </Button>
      </footer>
    </div>
  );
}
