"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./_components/navbar";
import { AdminNavbar } from "./admin/_components/admin-navbar";
import { useState } from "react";
import { UserButton } from "@/components/user-button";
import { MobileNavbar } from "./_components/mobile-navbar";
import { AdminMobileNavbar } from "./admin/_components/admin-mobile-navbar";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const user = useCurrentUser();
  const [open, setOpen] = useState(false);
  const [openAdminModal, setOpenAdminModal] = useState(false);
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
        <div className="w-full lg:pl-[200px] overflow-x-auto flex items-center my-5 justify-center">
          {children}
        </div>
        <div className="lg:hidden fixed w-full h-[60px] bg-gray-200 bottom-0 flex items-center justify-between px-4">
          {pathname.startsWith("/admin") ?
            <AdminMobileNavbar open={openAdminModal} setOpen={setOpenAdminModal} /> :
            <MobileNavbar open={open} setOpen={setOpen} />
          }
          <UserButton />
        </div>
      </div>
    </>
  );
}
