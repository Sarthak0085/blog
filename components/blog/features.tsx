import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import {
  DislikeSchema,
  FavouriteSchema,
  LikeSchema,
  SavedPostSchema,
} from "@/schemas";
import { ExtendBlog } from "@/utils/types";
import {
  BookmarkFilledIcon,
  BookmarkIcon,
} from "@radix-ui/react-icons";
import {
  FaRegEye,
  FaRegThumbsDown,
  FaRegThumbsUp,
  FaThumbsDown,
  FaThumbsUp,
} from "react-icons/fa";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import * as z from "zod";
import LoginButton from "../auth/login-button";
import { useState } from "react";
import { ShareModal } from "./share-modal";
import { domain } from "@/lib/domain";

interface FeaturesProps {
  like: { isLiked: boolean; count: number | undefined };
  dislike: { isDisliked: boolean; count: number | undefined };
  favourites: { isFavourite: boolean; count: number | undefined };
  handleLike: (values: z.infer<typeof LikeSchema>) => void;
  handleDislike: (values: z.infer<typeof DislikeSchema>) => void;
  toggleFavourite: (values: z.infer<typeof FavouriteSchema>) => void;
  data: ExtendBlog | null;
  isPending: boolean;
  handleCommentButtonClick: () => void;
  savedPost: { isSaved: boolean; count: number | undefined };
  handleSavedPost: (values: z.infer<typeof SavedPostSchema>) => void;
}

export const Features = ({
  like,
  dislike,
  favourites,
  handleDislike,
  handleLike,
  toggleFavourite,
  isPending,
  savedPost,
  handleSavedPost,
  data,
  handleCommentButtonClick
}: FeaturesProps) => {
  const user = useCurrentUser();
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openShareModal, setOpenShareModal] = useState(false);
  const count = (value: number) => {
    if (value) {
      const result =
        value > 1000000
          ? `${value / 1000000}m`
          : value > 1000
            ? `${value / 1000}k`
            : `${value}`;
      return result;
    } else {
      return 0;
    }
  };

  return (
    <>
      <div className="flex flex-wrap text-muted-forground gap-4 w-full justify-start">
        <div className="flex items-center">
          <Button
            title="Views"
            aria-label="Views"
            variant={"icon"}
            className="text-left !cursor-auto !p-3"
            aria-readonly
          >
            <FaRegEye color="blue" size={20} />
          </Button>
          <span>{count(data?.views ?? 0)}</span>
        </div>
        <LoginButton open={openLoginModal} setOpen={setOpenLoginModal} mode="Modal" >
          <div className="flex flex-wrap text-muted-forground gap-4">
            {((like.isLiked && !dislike.isDisliked) ||
              (!like.isLiked && !dislike.isDisliked)) && (
                <div className="flex items-center">
                  <Button
                    aria-label="Like"
                    variant={"icon"}
                    className="text-left !p-3"
                    disabled={isPending}
                    onClick={() => !user ? setOpenLoginModal(true) : handleLike({ blogId: data?.id as string })}
                  >
                    {like.isLiked ? (
                      <FaThumbsUp color="blue" size={16} />
                    ) : (
                      <FaRegThumbsUp color="blue" size={16} />
                    )}
                    <span className="sr-only">Like</span>
                  </Button>
                  <span>{count(like?.count ?? 0)}</span>
                </div>
              )}
            {((!like.isLiked && dislike.isDisliked) ||
              (!like.isLiked && !dislike.isDisliked)) && (
                <div className="flex items-center">
                  <Button
                    aria-label="Dislike"
                    variant={"icon"}
                    className="text-left !p-3"
                    disabled={isPending}
                    onClick={() => !user ? setOpenLoginModal(true) : handleDislike({ blogId: data?.id as string })}
                  >
                    {dislike.isDisliked ? (
                      <FaThumbsDown color="blue" size={16} />
                    ) : (
                      <FaRegThumbsDown color="blue" size={16} />
                    )}
                    <span className="sr-only">Dislike</span>
                  </Button>
                  <span>{count(dislike?.count ?? 0)}</span>
                </div>
              )}
            <div className="flex items-center">
              <Button
                aria-label="Favourite"
                variant={"icon"}
                className="text-left !p-3"
                disabled={isPending}
                onClick={() => !user ? setOpenLoginModal(true) : toggleFavourite({ blogId: data?.id as string })}
              >
                {favourites.isFavourite ? (
                  <IoMdHeart color="red" size={20} />
                ) : (
                  <IoMdHeartEmpty color="red" size={20} />
                )}
                <span className="sr-only">Favourite</span>
              </Button>
              <span>{count(favourites?.count ?? 0)}</span>
            </div>
            <div className="flex items-center">
              <Button
                title="Saved Post"
                aria-label="Saved Post"
                variant={"icon"}
                className="text-left !p-3"
                disabled={isPending}
                onClick={() => !user ? setOpenLoginModal(true) : handleSavedPost({ blogId: data?.id as string })}
              >
                {savedPost.isSaved ? (
                  <BookmarkFilledIcon color="gray" height={20} width={20} />
                ) : (
                  <BookmarkIcon color="gray" height={20} width={20} />
                )}
                <span className="sr-only">Saved Post</span>
              </Button>
              <span>{count(savedPost?.count ?? 0)}</span>
            </div>
          </div>
        </LoginButton>
        <div className="flex items-center">
          <Button
            variant={"icon"}
            className="text-left !p-3"
            onClick={() => handleCommentButtonClick()}
          >
            <svg fill="none" viewBox="0 0 20 20" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
              <path
                d="m12.5278 14.5556v-.75h-.75-8.00002c-.56801 0-1.02778-.4598-1.02778-1.0278v-8.00002c0-.56801.45977-1.02778
              1.02778-1.02778h12.44442c.568 0 1.0278.45977 1.0278 1.02778v7.94842c0 .9051-.4384 1.7561-1.1748
              2.2822l-3.5474 2.5341z"
                fill="transparent"
                stroke="#646970"
                strokeWidth="1.5"
              >
              </path>
            </svg>
            <span className="sr-only">Comment</span>
          </Button>
          <span>{count(data?.comments?.length ?? 0)}</span>
        </div>
        <ShareModal
          open={openShareModal}
          setOpen={setOpenShareModal}
          blogUrl={`${domain}}/blog/${data?.slug}`}
        >
          <Button variant={"ghost"} onClick={() => setOpenLoginModal(false)} className="!bg-transparent flex gap-2 items-center">
            <svg fill="none" className="text-gray-500" viewBox="0 0 20 20" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
              <path d="m11.8666 6.79996v-3.79996l6.8 6.64993-6.8 6.64997v-3.8s-10.19997-.8844-10.19997 4.5001c0-10.77003 10.19997-10.20004 10.19997-10.20004z" stroke="#646970" strokeLinecap="round" strokeWidth="1.5">
              </path>
            </svg>
            <span className="text-muted-foreground">Share</span>
          </Button>
        </ShareModal>
      </div>
    </>
  );
}
