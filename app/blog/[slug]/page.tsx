"use client";

import { BlogDetails } from "@/components/blog/blog-detail";
import { useParams } from "next/navigation";

export default function BlogPage() {
  const { slug } = useParams();
  console.log(slug);

  return <BlogDetails slug={slug} />;
}
