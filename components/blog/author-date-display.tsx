import { User } from "@prisma/client";
import Link from "next/link";

interface Props {
  author: User | undefined | null;
  date: string | Date | undefined;
  time: number | undefined;
  category: string | undefined;
}

export const AuthorAndDateDisplay = ({
  author,
  date,
  time,
  category,
}: Props) => {
  // function ReadTime(content: string) {
  //   const wordsPerMinute = 200;
  //   const words = content?.trim().split(/\s+/).length;
  //   const readTime = Math.ceil(words / wordsPerMinute);
  //   return readTime;
  // }

  function formatDateToUS(date: Date | string) {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  }

  return (
    <div className="w-full text-sm text-muted-foreground space-x-1 text-nowrap">
      <span>By</span>
      <Link
        href={`/author/${author?.id}`}
        className="hover:text-blue-500 font-medium"
      >
        <span>{author?.name}</span>
      </Link>
      <span>•</span>
      <Link
        href={`/blogs?category=${category}`}
        className="hover:text-blue-500 font-medium"
      >
        <span>
          {category}
        </span>
      </Link>
      <span>•</span>
      <Link
        href={`/blogs?date=${date}`}
        className="hover:text-blue-500 font-medium"
      >
        <span>
          {formatDateToUS(date || new Date())}
        </span>
      </Link>
      <span>•</span>
      <Link
        href={`/blogs?time=${time}`}
        className="hover:text-blue-500 font-medium"
      >
        <span>
          {time} min Read
        </span>
      </Link>
    </div>
  );
};
