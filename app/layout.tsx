import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";
import { Footer } from "@/components/footer";
import { Header } from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

const svg = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-vortex-vista">
  <path d="M4 20L12 4L20 20" stroke="sky" />
  <path d="M20 4L12 20L4 4" stroke="blueviolet" />
</svg>;

export const metadata: Metadata = {
  title: "Vortex Vista: A platform for every story. A blog for you by you",
  description: "A blog for you all for share your stories and read other's stories.",
  openGraph: {
    title: "Vortex Vista: A platform for every story. A blog for you by you",
    description: "A blog for you all for share your stories and read other's stories.",
    type: "website",
    locale: "en_US",
    url: "https://www.yourwebsite.com/your-page",
    images: [
      {
        url: `https://www.yourwebsite.com/${svg}`,
        width: 1200,
        height: 630,
        alt: "A description of the image"
      }
    ],
    siteName: "Vortex Vista"
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourtwitterhandle",
    creator: "@yourtwitterhandle",
    title: "Vortex Vista: A platform for every story. A blog for you by you",
    description: "A blog for you all for share your stories and read other's stories.",
    images: `https://www.yourwebsite.com/${svg}`
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  console.log("session", session)
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
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
