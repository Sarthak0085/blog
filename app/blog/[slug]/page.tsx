"use client";

import { getBlogDetailsBySlug } from "@/actions/blog-actions";
import { BlogDetails } from "@/components/blog/blog-detail";
import { ExtendBlog } from "@/utils/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "sonner";

export default function BlogPage() {
  const { slug } = useParams();
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

  if (loading) {
    return (
      <div className="w-full h-[100vh] flex items-center justify-center text-blue-600">
        <PulseLoader margin={2} size={20} />
      </div>
    );
  }

  return <BlogDetails data={data} />;
}
