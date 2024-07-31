import { Button } from "@/components/ui/button";
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
  ChatBubbleIcon,
  EyeOpenIcon,
} from "@radix-ui/react-icons";
import {
  FaRegThumbsDown,
  FaRegThumbsUp,
  FaThumbsDown,
  FaThumbsUp,
} from "react-icons/fa";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import * as z from "zod";

interface FeaturesProps {
  like: { isLiked: boolean; count: number | undefined };
  dislike: { isDisliked: boolean; count: number | undefined };
  favourites: { isFavourite: boolean; count: number | undefined };
  handleLike: (values: z.infer<typeof LikeSchema>) => void;
  handleDislike: (values: z.infer<typeof DislikeSchema>) => void;
  toggleFavourite: (values: z.infer<typeof FavouriteSchema>) => void;
  data: ExtendBlog | null;
  isPending: boolean;
  savedPost: { isSaved: boolean; count: number | undefined };
  handleSavedPost: (values: z.infer<typeof SavedPostSchema>) => void;
}

export function Features({
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
}: FeaturesProps) {
  const count = (value: number | undefined) => {
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
    <div className="flex text-muted-forground space-x-4 w-full justify-start">
      <div className="flex items-center">
        <Button
          title="Views"
          aria-label="Views"
          variant={"icon"}
          className="text-left cursor-default"
          aria-readonly
        >
          <EyeOpenIcon color="blue" />
        </Button>
        <span>{count(data?.views)}</span>
      </div>
      {((like.isLiked && !dislike.isDisliked) ||
        (!like.isLiked && !dislike.isDisliked)) && (
        <div className="flex items-center">
          <Button
            title="Like"
            aria-label="Like"
            variant={"icon"}
            className="text-left"
            disabled={isPending}
            onClick={() => handleLike({ blogId: data?.id as string })}
          >
            {like.isLiked ? (
              <FaThumbsUp color="blue" size={16} />
            ) : (
              <FaRegThumbsUp color="blue" size={16} />
            )}
          </Button>
          <span>{count(like.count)}</span>
        </div>
      )}
      {((!like.isLiked && dislike.isDisliked) ||
        (!like.isLiked && !dislike.isDisliked)) && (
        <div className="flex items-center">
          <Button
            title="Dislike"
            aria-label="Dislike"
            variant={"icon"}
            className="text-left"
            disabled={isPending}
            onClick={() => handleDislike({ blogId: data?.id as string })}
          >
            {dislike.isDisliked ? (
              <FaThumbsDown color="blue" size={16} />
            ) : (
              <FaRegThumbsDown color="blue" size={16} />
            )}
          </Button>
          <span>{count(dislike.count)}</span>
        </div>
      )}
      <div className="flex items-center">
        <Button
          title="Favourite"
          aria-label="Favourite"
          variant={"icon"}
          className="text-left"
          disabled={isPending}
          onClick={() => toggleFavourite({ blogId: data?.id as string })}
        >
          {favourites.isFavourite ? (
            <IoMdHeart color="red" size={20} />
          ) : (
            <IoMdHeartEmpty color="red" size={20} />
          )}
        </Button>
        <span>{count(favourites.count)}</span>
      </div>
      <div className="flex items-center">
        <Button
          title="Saved Post"
          aria-label="Saved Post"
          variant={"icon"}
          className="text-left"
          disabled={isPending}
          onClick={() => handleSavedPost({ blogId: data?.id as string })}
        >
          {savedPost.isSaved ? (
            <BookmarkFilledIcon color="gray" height={20} width={20} />
          ) : (
            <BookmarkIcon color="gray" height={20} width={20} />
          )}
        </Button>
        <span>{count(savedPost.count)}</span>
      </div>
      <div className="flex items-center">
        <Button variant={"icon"} className="text-left">
          <ChatBubbleIcon />
        </Button>
        <span>{count(data?.comments?.length)}</span>
      </div>
    </div>
  );
}
