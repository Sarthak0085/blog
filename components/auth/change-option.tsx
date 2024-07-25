"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface changeOptionProps {
  label: string;
  href: string;
}

export const ChangeOption = ({ label, href }: changeOptionProps) => {
  return (
    <Button variant={"link"} className="font-normal w-full" size={"sm"} asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
};
