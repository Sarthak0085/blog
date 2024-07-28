interface Props {
  author: string | undefined | null;
  date: string | Date | undefined;
  content: string | undefined;
  category: string | undefined;
}

export const AuthorAndDateDisplay = ({
  author,
  date,
  content,
  category,
}: Props) => {
  function ReadTime(content: string) {
    const wordsPerMinute = 200;
    const words = content?.trim().split(/\s+/).length;
    const readTime = Math.ceil(words / wordsPerMinute);
    return readTime;
  }

  function formatDateToUS(date: Date | string) {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  }

  return (
    <div className="w-full text-sm text-gray-600 text-nowrap">
      <span>By {author}</span> • <span>{category}</span> •{" "}
      <span>{formatDateToUS(date || new Date())}</span> •{" "}
      <span>{ReadTime(content || "")} min Read</span>
    </div>
  );
};
