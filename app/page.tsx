import { Footer } from "@/components/footer";
import { Hero } from "@/components/home/hero";
import { MostViewedBlogs } from "@/components/home/most-viewed-blogs";
import { RecentlyPublishedBlogs } from "@/components/home/recently-published-blogs";

export default function Home() {
  return (
    <div>
      <Hero />
      <RecentlyPublishedBlogs />
      <MostViewedBlogs />
      <Footer />
    </div>
  );
}
