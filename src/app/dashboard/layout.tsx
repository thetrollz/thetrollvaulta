"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  LayoutDashboard,
  Lock,
  PanelLeft,
  Settings,
  ShieldAlert,
  Sparkles,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TrollVaultLogo } from "@/components/troll-vault-logo";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/passwords", label: "Passwords", icon: Lock },
  { href: "/dashboard/notes", label: "Secure Notes", icon: FileText },
  { href: "/dashboard/generator", label: "Generator", icon: Sparkles },
  { href: "/dashboard/monitoring", label: "Monitoring", icon: ShieldAlert },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const getPageTitle = () => {
    const currentItem = navItems.find((item) => item.href === pathname);
    return currentItem ? currentItem.label : "Dashboard";
  };

  const desktopNav = (
    <>
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Tooltip key={item.href}>
            <TooltipTrigger asChild>
              <Link href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  size="icon"
                  className="rounded-lg bg-secondary/50"
                  aria-label={item.label}
                >
                  <item.icon className="size-5" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              {item.label}
            </TooltipContent>
          </Tooltip>
        );
      })}
    </>
  );

  const mobileNav = (
    <>
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-4 px-2.5",
              isActive
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        );
      })}
    </>
  );

  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full flex-col bg-background">
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-16 flex-col border-r bg-background sm:flex">
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <Link
              href="/dashboard"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            >
              <TrollVaultLogo />
              <span className="sr-only">The Troll Vault</span>
            </Link>
            {desktopNav}
          </nav>
          <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="#">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="mt-auto rounded-lg"
                    aria-label="Settings"
                  >
                    <Settings className="size-5" />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Settings
              </TooltipContent>
            </Tooltip>
          </nav>
        </aside>
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-16">
          <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <div className="flex items-center gap-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button size="icon" variant="outline" className="sm:hidden">
                    <PanelLeft className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="sm:max-w-xs">
                  <nav className="grid gap-6 text-lg font-medium">
                    <Link
                      href="#"
                      className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                    >
                      <TrollVaultLogo />
                      <span className="sr-only">The Troll Vault</span>
                    </Link>
                    {mobileNav}
                  </nav>
                </SheetContent>
              </Sheet>
              <h1 className="font-headline text-2xl font-semibold text-primary">
                {getPageTitle()}
              </h1>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="overflow-hidden rounded-full"
                >
                  <User />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/">Logout</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <main className="flex-1 p-4 sm:px-6 sm:py-0 md:gap-8 crt">
            {children}
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
