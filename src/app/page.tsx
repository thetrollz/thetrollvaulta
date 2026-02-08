'use client';

import { useState } from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  ShieldCheck,
  LogOut,
  SlidersHorizontal,
  Search,
  Trash2,
  Plus,
  Shield,
  Bomb,
} from 'lucide-react';
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
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';

export default function VaultPage() {
  const [privacyOn, setPrivacyOn] = useState(true);
  const { toast } = useToast();

  const handlePurge = () => {
    console.log('Purge initiated.');
    toast({
      title: 'Nuclear Terminate',
      description: 'All vault data has been permanently erased.',
      variant: 'destructive',
    });
  };

  const secrets = [
    { id: 1, name: 'H', username: 'user@example.com', service: 'Platform', has2fa: true, hasKey: true },
  ];

  return (
    <main
      className="flex min-h-screen flex-col items-center p-4 bg-black text-white"
      suppressHydrationWarning
    >
      <div className="w-full max-w-md flex-grow space-y-8 pt-4 pb-8">
        <header className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-2 rounded-lg bg-green-500/20 border border-green-500/30 shadow-[0_0_10px] shadow-green-500/30">
              <ShieldCheck className="h-8 w-8 text-green-500" />
            </div>
            <div>
              <h1 className="font-headline text-2xl font-bold tracking-widest text-foreground">
                THE TROLL VAULT
              </h1>
              <p className="font-code text-xs tracking-[0.2em] text-green-500">
                ● SECURE OPERATIONAL
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <LogOut className="h-6 w-6 text-muted-foreground" />
          </Button>
        </header>

        <div className="grid grid-cols-2 gap-4">
          <Button
            variant={privacyOn ? 'default' : 'secondary'}
            onClick={() => setPrivacyOn(!privacyOn)}
            className={`h-12 font-bold text-base ${privacyOn ? 'bg-green-500/90 hover:bg-green-500 text-black' : ''}`}>
            <Shield className="mr-2 h-5 w-5" />
            PRIVACY {privacyOn ? 'ON' : 'OFF'}
          </Button>
          <Button variant="secondary" className="h-12 font-bold text-base bg-zinc-800 hover:bg-zinc-700">
            <SlidersHorizontal className="mr-2 h-5 w-5" />
            SYSTEM OPS
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search Vault Sector..."
            className="pl-12 h-14 bg-zinc-900 border-zinc-800 rounded-lg"
          />
        </div>

        <div className="space-y-4">
          {secrets.map((secret) => (
            <div
              key={secret.id}
              className="flex items-center p-3 rounded-xl bg-zinc-900 border border-zinc-800"
            >
              <div className="flex-shrink-0 h-10 w-10 rounded-md bg-green-500/90 flex items-center justify-center font-bold text-xl text-black">
                {secret.name.charAt(0)}
              </div>
              <div className="ml-4 flex-grow font-code">
                <p
                  className={`font-bold text-lg tracking-wider ${privacyOn ? 'blur-sm' : ''
                    }`}
                >
                  {secret.username}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                {secret.has2fa && (
                  <span className="font-code text-xs text-green-400 tracking-widest pr-2">2FA</span>
                )}
                {secret.hasKey && (
                  <Button size="sm" className="h-8 bg-green-500/90 hover:bg-green-500 text-black font-bold">
                    KEY
                  </Button>
                )}
                <Button variant="ghost" size="icon" className="text-red-500/70 hover:text-red-500">
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full max-w-md space-y-4 pt-4 pb-4">
        <Button size="lg" className="w-full h-14 font-bold text-lg bg-green-500/90 hover:bg-green-500 text-black">
          <Plus className="mr-2 h-6 w-6" />
          ADD NEW SECRET
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              size="lg"
              variant="destructive"
              className="w-full h-14 font-bold text-lg bg-red-900/80 hover:bg-red-900 border border-red-500/50 text-red-300"
            >
              <Bomb className="mr-2 h-6 w-6" />
              NUCLEAR TERMINATE
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently erase all data.
                This is the final safeguard. There is no recovery.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className={buttonVariants({ variant: 'destructive' })}
                onClick={handlePurge}
              >
                Confirm Termination
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </main>
  );
}
