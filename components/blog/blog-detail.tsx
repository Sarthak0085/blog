"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AuthorAndDateDisplay } from "./author-date-display";
import { toast } from "sonner";
import { ExtendBlog } from "@/utils/types";
import {
  getBlogDetailsBySlug,
  incrementViewCount,
} from "@/actions/blog-actions";
import Link from "next/link";
import { PulseLoader } from "react-spinners";
import { MarkdownContent } from "@/components/blog/markdown-content";
import { BlogBreadCrumb } from "@/components/blog/blog-bread-crumb";

export const BlogDetails = ({ slug }: { slug: string }) => {
  const [data, setData] = useState<ExtendBlog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBlogDetailsBySlug(slug as string);
        if (!data) {
          toast.error("Blog post not found");
        } else {
          setData(data?.data as ExtendBlog);
        }
      } catch (error) {
        console.error("Error fetching blog data:", error);
        toast.error("Error while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const incrementViews = async () => {
      const result = await incrementViewCount(data?.id as string);
      if (result.error) {
        console.error(result.error);
      }
    };

    incrementViews();
  }, [data?.id]);

  const backgroundImageUrl =
    "https://tailwindcss.com/_next/static/media/docs@30.8b9a76a2.avif";

  if (loading) {
    return (
      <div className="w-full h-[100vh] flex items-center justify-center text-blue-600">
        <PulseLoader margin={2} size={20} />
      </div>
    );
  }
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
      }}
      className="relative bg-cover bg-center min-h-screen w-full bg-fixed flex justify-center items-center"
    >
      <div className="relative w-full md:w-[75%] lg:w-[65%] xl:w-[55%] flex flex-col space-y-4 px-10 py-10">
        <div>
          <BlogBreadCrumb
            category={data?.category?.name}
            slug={slug || data?.slug}
          />
        </div>
        <div className="flex space-x-4">
          {data?.tags.map((item, index) => (
            <Link
              key={index}
              href={`/blogs?tag=${item}`}
              className="border p-1 border-collapse text-sm text-muted-foreground border-[purple] rounded-md cursor-pointer hover:bg-[purple] hover:text-white"
            >
              #{item}
            </Link>
          ))}
        </div>
        <div>
          <h1 className="text-3xl font-bold">{data?.title}</h1>
        </div>
        <AuthorAndDateDisplay
          author={data?.user?.name}
          date={data?.createdAt}
          content={data?.content}
          category={data?.category?.name}
        />
        <div className="text-muted-foreground">{data?.shortSummary}</div>
        <Image
          src={data?.imageUrl || ""}
          alt={`image of :- ${data?.slug}`}
          className="w-full h-auto object-cover rounded-md"
          width={500}
          height={500}
        />

        <div className="text-black">
          <MarkdownContent content={data?.content} />
        </div>
      </div>
    </div>
  );
};
