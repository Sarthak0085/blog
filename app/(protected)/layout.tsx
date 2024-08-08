"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./_components/Navbar";
import { AdminNavbar } from "./admin/_components/admin-navbar";
import { HiBars2, HiBars3 } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { UserButton } from "@/components/user-button";
import { MobileNavbar } from "./_components/mobile-navbar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="flex w-full min-h-screen lg:space-x-10 py-5">
        {pathname.startsWith("/admin") ?
          <div className="lg:block hidden">
            <AdminNavbar />
          </div> :
          <div className="lg:block hidden">
            <Navbar />
          </div>
        }
        <main className="w-full lg:pl-[200px] overflow-x-auto flex items-center my-5 justify-center">
          {children}
        </main>
        <div className="fixed w-full h-[60px] bg-gray-200 bottom-0 flex items-center justify-between px-4">
          <div>
            <MobileNavbar open={open} setOpen={setOpen} />
          </div>
          <UserButton />
        </div>
      </div>
    </>
  );
}
