import { formatDate } from "@/lib/date-format";
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
  return (
    <div className="w-full text-sm text-muted-foreground space-x-1 text-wrap">
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
          {formatDate(date || new Date())}
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
