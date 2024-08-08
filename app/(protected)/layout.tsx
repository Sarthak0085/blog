"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./_components/Navbar";
import { AdminNavbar } from "./admin/_components/admin-navbar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex w-full min-h-screen space-x-10 py-5">
      {pathname.startsWith("/admin") ? <AdminNavbar /> : <Navbar />}
      <main className="w-full lg:pl-[200px] flex items-center my-5 justify-center">
        {children}
      </main>
    </div>
  );
}
