"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/social";
import { ChangeOption } from "@/components/auth/change-option";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px]">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <>
          <div className="flex items-center mb-5 px-3">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-2 text-gray-600 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <CardFooter>
            <Social />
          </CardFooter>
        </>
      )}
      <CardFooter>
        <ChangeOption label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};
