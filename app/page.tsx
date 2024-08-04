import { Blogs } from "@/components/blog/blogs";
import { Header } from "@/components/Header";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
  const backgroundImageUrl =
    "https://tailwindcss.com/_next/static/media/docs@30.8b9a76a2.avif";

  return (
    // <div
    //   className="flex flex-col w-full h-full items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]
    //  from-sky-400 to-blue-800"
    // >
    <div
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
      }}
      className="relative bg-cover bg-center  w-full bg-fixed flex flex-col justify-center items-center"
    >
      <Header />
      <Blogs />
    </div>
  );
}
