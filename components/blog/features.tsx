import { Button } from "@/components/ui/button";
import { DislikeSchema, FavouriteSchema, LikeSchema } from "@/schemas";
import { ExtendBlog } from "@/utils/types";
import { ChatBubbleIcon, EyeOpenIcon } from "@radix-ui/react-icons";
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
}

export function Features({
  like,
  dislike,
  favourites,
  handleDislike,
  handleLike,
  toggleFavourite,
  isPending,
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
    <div className="flex text-muted-forground w-full justify-evenly">
      <div className="flex items-center">
        <Button variant={"icon"} className="text-left" aria-readonly>
          <EyeOpenIcon color="blue" />
        </Button>
        <span>{count(data?.views)}</span>
      </div>
      <div className="flex items-center">
        <Button
          variant={"icon"}
          className="text-left"
          disabled={isPending}
          onClick={() => handleLike({ blogId: data?.id as string })}
        >
          {like.isLiked ? (
            <FaThumbsUp color="blue" />
          ) : (
            <FaRegThumbsUp color="blue" />
          )}
        </Button>
        <span>{count(like.count)}</span>
      </div>
      <div className="flex items-center">
        <Button
          variant={"icon"}
          className="text-left"
          disabled={isPending}
          onClick={() => handleDislike({ blogId: data?.id as string })}
        >
          {dislike.isDisliked ? (
            <FaThumbsDown color="blue" />
          ) : (
            <FaRegThumbsDown color="blue" />
          )}
        </Button>
        <span>{count(dislike.count)}</span>
      </div>
      <div className="flex items-center">
        <Button
          variant={"icon"}
          className="text-left"
          disabled={isPending}
          onClick={() => toggleFavourite({ blogId: data?.id as string })}
        >
          {favourites.isFavourite ? (
            <IoMdHeart color="red" />
          ) : (
            <IoMdHeartEmpty color="red" />
          )}
        </Button>
        <span>{count(favourites.count)}</span>
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
