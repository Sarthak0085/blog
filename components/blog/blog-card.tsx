import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { GoTag } from "react-icons/go";

interface BlogCardProps {
  title: string;
  image: string;
  createdAt: Date | string;
  tags: string;
  slug: string;
  content: string;
}

export const BlogCard = ({
  title,
  image,
  createdAt,
  tags,
  content,
  slug,
}: BlogCardProps) => {
  function formatDateToUS(date: Date | string) {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  }

  function ReadTime(content: string) {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const readTime = Math.ceil(words / wordsPerMinute);
    return readTime;
  }

  return (
    <Card className="w-[350px] flex flex-col">
      <CardHeader>
        <Link href={`/blog/${slug}`} className="cursor-pointer">
          <Image
            src={image}
            alt={slug}
            className="w-full h-[300px] object-fill"
            height={200}
            width={200}
          />
        </Link>
      </CardHeader>
      <CardContent>
        <Link
          href={`/blog/${slug}`}
          className="cursor-pointer flex flex-col space-y-2"
        >
          <span className="flex justify-items-start text-sm text-gray-500">
            {formatDateToUS(createdAt)}
          </span>
          <h2 className="bold text-2xl text-start">{title}</h2>
          <div className="flex items-center justify-between w-full text-sm text-gray-600 text-nowrap">
            <div className="flex items-center justify-center">
              <GoTag className="me-1 mt-[2px]" />
              {tags}
            </div>
            •
            <div className="flex justify-items-end">
              {ReadTime(content)} min Read
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};
