import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";
import { Footer } from "@/components/footer";
import { Header } from "@/components/Header";
import Head from "next/head";

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
  const backgroundImageUrl =
    "https://tailwindcss.com/_next/static/media/docs@30.8b9a76a2.avif";

  return (
    <>
      <Head>
        <meta name="keywords" content="blog, stories, writing, community, literature, personal stories" />
        <meta name="author" content="Sarthak" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="application-name" content="Vortex Vista" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="format-detection" content="telephone=no" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="twitter:site" content="@yourtwitterhandle" />
        <meta name="twitter:creator" content="@yourtwitterhandle" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Vortex Vista: A platform for every story. A blog for you by you" />
        <meta name="twitter:description" content="A blog for you to share your stories and read others'. Join a community of writers and readers." />
        <meta name="twitter:image" content="https://www.yourwebsite.com/your-image.jpg" />
        <meta name="twitter:image:alt" content="A description of the image" />
      </Head>
      <html lang="en">
        <SessionProvider session={session}>
          <body className={inter.className}>
            <Header />
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
          </body>
        </SessionProvider>
      </html>
    </>
  );
}
