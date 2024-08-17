import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Vortex Vista: A blog for you",
    template: "%s - Vortex Vista"
  },
  description: "A blog for you all for share your stories and read other's stories!",
  twitter: {
    card: "summary_large_image",
    site: "https://x.com/sarthak102000",
    creator: "https://x.com/sarthak102000",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const backgroundImageUrl =
    "https://tailwindcss.com/_next/static/media/docs@30.8b9a76a2.avif";

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <Header user={session?.user} />
          <main
            style={{
              backgroundImage: `url(${backgroundImageUrl})`,
            }}
            className="bg-cover bg-center pt-[5rem]  w-full bg-fixed flex flex-col justify-center items-center"
          >
            <Toaster position="top-right" />
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
