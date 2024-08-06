import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import { Oxygen, Roboto } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { ExtendBlog } from "@/utils/types";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { useState, useTransition } from "react";
import { FavouriteSchema, SavedPostSchema } from "@/schemas";
import * as z from "zod";
import { addOrRemoveToFavourite } from "@/actions/favourites/add-to-favourite";
import { toast } from "sonner";
import { savedBlogPost } from "@/actions/savedpost/saved-blog-post";
import { BookmarkFilledIcon, BookmarkIcon } from "@radix-ui/react-icons";
import { CommentForm } from "./comment-form";
import { ShareModal } from "./share-modal";
import { domain } from "@/lib/domain";

interface BlogCardProps {
  data: ExtendBlog;
}

const roboto = Roboto({
  subsets: ["cyrillic", "latin"],
  weight: ["500", "700", "900"],
});

const oxygen = Oxygen({
  subsets: ["latin"],
  weight: ["400", "700"],
})

export const BlogCard = ({
  data
}: BlogCardProps) => {
  const [open, setOpen] = useState(false);
  const [openShareModal, setOpenShareModal] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [favourites, setFavourites] = useState({
    isFavourite: !!data?.favourites?.find((item) => item.userId === data.user?.id),
    count: data?.favourites?.length,
  });
  const [savedPost, setSavedPost] = useState({
    isSaved: !!data?.savedPosts?.find((item) => item.userId === data.user?.id),
    count: data?.savedPosts?.length,
  });
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

  const toggleFavourite = (values: z.infer<typeof FavouriteSchema>) => {
    const prevFav = favourites;
    setFavourites((prev) => ({
      isFavourite: !prev.isFavourite,
      count: prev.isFavourite ? (prev.count || 1) - 1 : (prev.count || 0) + 1,
    }));

    startTransition(() => {
      addOrRemoveToFavourite(values)
        .then((data) => {
          if (data?.success) {
            toast.success(data?.success);
          }
          if (data?.error) {
            setFavourites(prevFav);
            toast.error(data?.error);
          }
        })
        .catch((error) => {
          setFavourites(prevFav);
          toast.error(error);
        });
    });
  };

  const handleSavedPost = (values: z.infer<typeof SavedPostSchema>) => {
    const prevSavedPost = savedPost;
    setSavedPost((prev) => ({
      isSaved: !prev.isSaved,
      count: prev.isSaved ? (prev.count || 1) - 1 : (prev.count || 0) + 1,
    }));

    startTransition(() => {
      savedBlogPost(values)
        .then((data) => {
          if (data?.success) {
            toast.success(data?.success);
          }
          if (data?.error) {
            setSavedPost(prevSavedPost);
            toast.error(data?.error);
          }
        })
        .catch((error) => {
          setSavedPost(prevSavedPost);
          toast.error(error);
        });
    });
  };

  return (
    <Card className="w-full min-h-[250px] max-w-[720px] border-[2px] shadow-md shadow-[#00000000d]">
      <CardContent >
        <Link href={`/blog/${data?.slug}`}>
          <div className="flex min-h-[200px]">
            <div className="flex items-center justify-between gap-6">
              <div className="min-h-[100px] space-y-2 flex-1">
                <div className="flex flex-col">
                  <h2 className="break-words text-xl">{data?.title}</h2>
                  <div className="flex text-[14px]">
                    <div className={cn("flex items-start space-x-1", roboto.className)}>
                      <Link href={`/author/${data?.user?.id}`}>
                        <span className="text-muted-foreground hover:text-[#0675c4]  capitalize cursor-pointer text-[13px]">
                          {data?.user?.name}
                        </span>
                      </Link>
                      <span>·</span>
                      <Link href={`/blogs?category=${data?.category?.name}`}>
                        <span className="text-muted-foreground hover:text-[#0675c4]  cursor-pointer text-[13px]">
                          {data?.category?.name}
                        </span>
                      </Link>
                      <span>·</span>
                      <Link href={`/blogs?date=${data?.createdAt}`}>
                        <span className="text-muted-foreground hover:text-[#0675c4]  cursor-pointer text-[13px]">
                          {formatDateToUS(data?.createdAt)}
                        </span>
                      </Link>
                      <span>·</span>
                      <Link href={`/blogs?time=${ReadTime(data?.content)}`}>
                        <span className="text-muted-foreground hover:text-[#0675c4]  cursor-pointer text-[13px]">
                          {ReadTime(data?.content) > 1 ? `${ReadTime(data?.content)} mins` : `${ReadTime(data?.content)} min`}
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
                <p className={cn("mb-[10px] text-wrap", oxygen.className)}>
                  {data?.shortSummary.length > 180 ? `${data?.shortSummary.slice(0, 180)}...` : data?.shortSummary}
                </p>
              </div>
              <div className="items-end">
                <div className="flex items-center justify-center border-[2px] rounded-lg">
                  <Image
                    src={data?.imageUrl ?? ""}
                    alt={data?.slug}
                    className="w-[180px] h-[150px] object-fill"
                    height={180}
                    width={180}
                  />
                </div>
              </div>
            </div>
          </div>
        </Link>
        <ul className="flex items-start mb-5">
          <li>
            <ShareModal
              open={openShareModal}
              setOpen={setOpenShareModal}
              blogUrl={`${domain}}/blog/${data?.slug}`}
            >
              <Button variant={"ghost"} className="!bg-transparent flex gap-2 items-center">
                <svg fill="none" className="text-gray-500" viewBox="0 0 20 20" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                  <path d="m11.8666 6.79996v-3.79996l6.8 6.64993-6.8 6.64997v-3.8s-10.19997-.8844-10.19997 4.5001c0-10.77003 10.19997-10.20004 10.19997-10.20004z" stroke="#646970" strokeLinecap="round" strokeWidth="1.5">
                  </path>
                </svg>
                <span className="text-muted-foreground">Share</span>
              </Button>
            </ShareModal>
          </li>
          <li>
            <Button
              variant={"ghost"}
              className="!bg-transparent flex gap-2 items-center"
              onClick={() => setOpen(!open)}
            >
              <svg fill="none" viewBox="0 0 20 20" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="m12.5278 14.5556v-.75h-.75-8.00002c-.56801 0-1.02778-.4598-1.02778-1.0278v-8.00002c0-.56801.45977-1.02778
                   1.02778-1.02778h12.44442c.568 0 1.0278.45977 1.0278 1.02778v7.94842c0 .9051-.4384 1.7561-1.1748
                   2.2822l-3.5474 2.5341z"
                  fill="#fff"
                  stroke="#646970"
                  strokeWidth="1.5"
                >
                </path>
              </svg>
              <span className="text-muted-foreground">{data?.comments?.length}</span>
              <span className="sr-only">Comments</span>
            </Button>
          </li>
          <li>
            <Button
              variant={"ghost"}
              title="Favourite"
              aria-label="Favourite"
              disabled={isPending}
              className="!bg-transparent flex items-center justify-center gap-2"
              onClick={() => toggleFavourite({ blogId: data?.id as string })}
            >
              {favourites.isFavourite ? (
                <IoMdHeart color="red" size={20} />
              ) : (
                <IoMdHeartEmpty color="red" size={20} />
              )}
              <span className="text-muted-foreground">{favourites.count}</span>
              <span className="sr-only">Favourite</span>
            </Button>
          </li>
          <li>
            <Button
              title="Saved Post"
              aria-label="Saved Post"
              variant={"ghost"}
              className="!bg-transparent flex items-center justify-center gap-2"
              disabled={isPending}
              onClick={() => handleSavedPost({ blogId: data?.id as string })}
            >
              {savedPost.isSaved ? (
                <BookmarkFilledIcon color="gray" height={20} width={20} />
              ) : (
                <BookmarkIcon color="gray" height={20} width={20} />
              )}
              <span>{savedPost.count}</span>
              <span className="sr-only">Saved Post</span>
            </Button>
          </li>
        </ul>
        {open &&
          <CommentForm blogId={data?.id} isBlogCard={true} />
        }
      </CardContent>
    </Card>
  );
};
