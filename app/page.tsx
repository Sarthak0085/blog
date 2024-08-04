import { Blogs } from "@/components/blog/blogs";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
  const backgroundImageUrl =
    "https://tailwindcss.com/_next/static/media/docs@30.8b9a76a2.avif";

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
      }}
      className="bg-cover bg-center  w-full bg-fixed flex flex-col justify-center items-center"
    >
      <Header />
      <Hero />
    </div>
  );
}
