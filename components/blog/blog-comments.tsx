import { cn } from "@/lib/utils";
import { ExtendComment } from "@/utils/types";
import { useState } from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FaUser } from "react-icons/fa";

export const BlogComments = ({ comments }: { comments: ExtendComment[] | undefined }) => {
  const [showReplies, setShowReplies] = useState(false);

  const repliesComments = (commentId: string) => {
    return comments?.filter((comment) => comment.parentId === commentId);
  }

  return (
    comments?.map((item: ExtendComment, index: number) => (
      <div className={cn("w-full pb-4")} key={index}>
        {!item.parentId && <div className="flex mb-4">
          <Avatar>
            <AvatarImage
              height={20}
              width={20}
              src={item?.user?.image || ""}
              alt="Avatar"
            />
            <AvatarFallback className="bg-sky-500">
              <FaUser className="text-white" />
            </AvatarFallback>
          </Avatar>
          <div className="pl-2">
            <div className="flex items-center space-x-1">
              <h5 className="capitalize text-black dark:text-white text-[18px]">
                {item?.user?.name}
              </h5>
              <small className="text-muted-foreground">
                • {new Date(item?.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })}
              </small>
            </div>
            <p className="text-black dark:text-white">
              {item?.content}
            </p>

            {!item.parentId && Number(repliesComments(item?.id)?.length) > 0 && (
              <Button variant={"ghost"} className="!bg-transparent !text-muted-foreground" onClick={() => setShowReplies(!showReplies)}>
                {showReplies ? 'Hide Replies' : 'Show Replies'}{"  "}({Number(repliesComments(item?.id)?.length)})
              </Button>
            )}
          </div>
        </div>}
        {showReplies && repliesComments(item?.id)?.map((comment: ExtendComment) => {
          return (
            <div key={comment?.id} className={cn("flex", "ml-[30px]")}>
              <Avatar>
                <AvatarImage
                  height={20}
                  width={20}
                  src={item?.user?.image || ""}
                  alt="Avatar"
                />
                <AvatarFallback className="bg-sky-500">
                  <FaUser className="text-white" />
                </AvatarFallback>
              </Avatar>
              <div className="pl-2">
                <div className="flex items-center space-x-1">
                  <h5 className="capitalize text-black dark:text-white text-[18px]">
                    {item?.user?.name}
                  </h5>
                  <small className="text-muted-foreground">
                    • {new Date(item?.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </small>
                </div>
                <p className="text-black ">
                  {item?.content}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    ))
  );
};
