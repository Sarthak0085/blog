"use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { LoginForm } from "@/components/auth/login-form";

interface LoginButtonProps {
  children?: React.ReactNode;
  mode?: "Modal" | "Redirect";
  asChild?: boolean;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

export default function LoginButton({
  children,
  mode,
  asChild,
  open,
  setOpen
}: LoginButtonProps) {
  const router = useRouter();
  const onClick = () => {
    router.push("/auth/login");
  };

  if (mode === "Modal") {
    return (
      <Dialog defaultOpen={open} onOpenChange={() => { setOpen && setOpen(!open) }}>
        <DialogTrigger onClick={() => { setOpen && setOpen(true) }} asChild={asChild}>{children}</DialogTrigger>
        <DialogContent className="p-0 w-auto bg-transparent border-none">
          <LoginForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
}
