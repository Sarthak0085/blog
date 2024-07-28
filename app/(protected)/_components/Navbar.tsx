"use client";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/user-button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();
  return (
    <aside className="bg-secondary py-10 flex flex-col justify-between items-center rounded-xl shadow-sm">
      <div className="flex flex-col gap-y-5">
        <Button
          className="w-full"
          asChild
          variant={pathname === "/admin" ? "default" : "outline"}
        >
          <Link href={"/admin"}>Admin</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/client" ? "default" : "outline"}
        >
          <Link href={"/client"}>Client</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/server" ? "default" : "outline"}
        >
          <Link href={"/server"}>Server</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/settings" ? "default" : "outline"}
        >
          <Link href={"/settings"}>Settings</Link>
        </Button>
      </div>
      <div className="pt-5">
        <UserButton />
      </div>
    </aside>
  );
};
