"use server";

import { signOut } from "@/auth";
import { redirect } from "next/navigation";

export const logout = async () => {
  await signOut({ redirect: true, redirectTo: "/auth/login" });
};
