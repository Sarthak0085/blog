"use client";

import Image from "next/image";
import { useEffect, useState, useTransition } from "react";
import { AuthorAndDateDisplay } from "./author-date-display";
import { ExtendBlog } from "@/utils/types";
import { incrementViewCount } from "@/actions/blog-actions";
import Link from "next/link";
import { MarkdownContent } from "@/components/blog/markdown-content";
import { BlogBreadCrumb } from "@/components/blog/blog-bread-crumb";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Features } from "./features";
import * as z from "zod";
import { likeBlog } from "@/actions/likes/like-blog";
import { toast } from "sonner";
import { DislikeSchema, FavouriteSchema, LikeSchema } from "@/schemas";
import { dislikeBlog } from "@/actions/dislikes/dislike-blog";
import { addOrRemoveToFavourite } from "@/actions/add-to-favourite";
import { savedBlogPost } from "@/actions/saved-blog-post";

export const BlogDetails = ({ data }: { data: ExtendBlog | null }) => {
  const user = useCurrentUser();
  const [isPending, startTransition] = useTransition();

  const [like, setLike] = useState({
    isLiked: !!data?.likes.find((item) => item.userId === user?.id),
    count: data?.likes?.length,
  });
  const [dislike, setDislike] = useState({
    isDisliked: !!data?.dislikes.find((item) => item.userId === user?.id),
    count: data?.dislikes?.length,
  });
  const [favourites, setFavourites] = useState({
    isFavourite: !!data?.favourites.find((item) => item.userId === user?.id),
    count: data?.favourites?.length,
  });
  const [savedPost, setSavedPost] = useState({
    isSaved: !!data?.savedPosts.find((item) => item.userId === user?.id),
    count: data?.savedPosts?.length,
  });

  const handleLike = (values: z.infer<typeof LikeSchema>) => {
    const prevLike = like;
    setLike((prev) => ({
      isLiked: !prev.isLiked,
      count: prev.isLiked ? (prev.count || 1) - 1 : (prev.count || 0) + 1,
    }));

    startTransition(() => {
      likeBlog(values)
        .then((data) => {
          if (data?.success) {
            toast.success(data?.success);
          }
          if (data?.error) {
            setLike(prevLike);
            toast.error(data?.error);
          }
        })
        .catch((error) => {
          setLike(prevLike);
          toast.error(error);
        });
    });
  };

  const handleDislike = (values: z.infer<typeof DislikeSchema>) => {
    const prevDislike = dislike;
    setDislike((prev) => ({
      isDisliked: !prev.isDisliked,
      count: prev.isDisliked ? (prev.count || 1) - 1 : (prev.count || 0) + 1,
    }));

    startTransition(() => {
      dislikeBlog(values)
        .then((data) => {
          if (data?.success) {
            toast.success(data?.success);
          }
          if (data?.error) {
            setDislike(prevDislike);
            toast.error(data?.error);
          }
        })
        .catch((error) => {
          setDislike(prevDislike);
          toast.error(error);
        });
    });
  };

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

  const handleSavedPost = (values: z.infer<typeof LikeSchema>) => {
    const prevLike = like;
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
            setLike(prevLike);
            toast.error(data?.error);
          }
        })
        .catch((error) => {
          setLike(prevLike);
          toast.error(error);
        });
    });
  };

  useEffect(() => {
    const incrementViews = async () => {
      const result = await incrementViewCount(data?.id as string);
      if (result.error) {
        console.error(result.error);
      }
    };

    incrementViews();
  }, [data]);

  const backgroundImageUrl =
    "https://tailwindcss.com/_next/static/media/docs@30.8b9a76a2.avif";

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
      }}
      className="relative bg-cover bg-center min-h-screen w-full bg-fixed flex justify-center items-center"
    >
      <div className="relative w-full md:w-[75%] lg:w-[65%] xl:w-[55%] flex flex-col space-y-4 px-10 py-10">
        <div>
          <BlogBreadCrumb category={data?.category?.name} slug={data?.slug} />
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
        <Features
          like={like}
          dislike={dislike}
          favourites={favourites}
          savedPost={savedPost}
          handleLike={handleLike}
          handleDislike={handleDislike}
          toggleFavourite={toggleFavourite}
          handleSavedPost={handleSavedPost}
          isPending={isPending}
          data={data}
        />
        <div className="text-muted-foreground bold">{data?.shortSummary}</div>
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
