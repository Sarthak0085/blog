import { cn } from "@/lib/utils";
import { ExtendComment } from "@/utils/types";
import { forwardRef, useState } from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FaUser } from "react-icons/fa";
import { CommentForm } from "./comment-form";
import { LikeComment } from "./like-comment";
import { Separator } from "../ui/separator";

interface BlogCommentsProps {
  comments: ExtendComment[] | undefined;
  blogId?: string;
}

export const BlogComments = forwardRef<HTMLDivElement, BlogCommentsProps>((props, ref) => {
  const { comments, blogId } = props;
  const [showReplies, setShowReplies] = useState<Record<string, boolean>>({});
  const [openReplyInput, setOpenReplyInputs] = useState<Record<string, boolean>>({});

  const repliesComments = (commentId: string) => {
    return comments?.filter((comment) => comment.parentId === commentId);
  }

  function formatRelativeTime(date: Date) {
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const years = Math.floor(days / 365);

    if (years > 0) {
      return `${years}y`;
    } else if (days > 0) {
      return `${days}d`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else if (minutes > 0) {
      return `${minutes}m`;
    } else {
      return `${seconds}s`;
    }
  }

  return (
    <div ref={ref} className="w-full mt-6">
      <h2 className="uppercase text-xl font-medium my-2">Post a comment</h2>
      <CommentForm blogId={blogId} />
      <h2 className="text-xl font-medium text-black mb-1">
        Comments
      </h2>
      <Separator color="black" className="mb-2 !h-[2px] !text-black" />
      {comments?.map((item: ExtendComment, index: number) => (
        <div className={cn("w-full pb-2 flex items-center justify-between")} key={index}>
          {!item.parentId &&
            <div className="w-full flex justify-between">
              <div className="flex mb-4">
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
                    <h5 className="capitalize text-muted-foreground text-[16px] ">
                      {item?.user?.name}
                    </h5>
                  </div>
                  <p className="text-black dark:text-white">
                    {item?.content}
                  </p>
                  <div className="w-full flex items-center justify-start space-x-2">
                    <small className="text-muted-foreground text-[15px] font-medium">
                      {formatRelativeTime(item?.createdAt)} •
                    </small>
                    <small className="text-muted-foreground text-[15px] font-medium">
                      likes •
                    </small>
                    <Button
                      variant={"ghost"}
                      className="!text-muted-foreground !bg-transparent flex !justify-start !p-0 "
                      onClick={() => setOpenReplyInputs((prev) => ({
                        ...prev,
                        [item?.id]: !prev[item?.id],
                      }))}
                    >
                      Reply
                    </Button>
                  </div>
                  {
                    openReplyInput[item?.id] &&
                    <CommentForm isReply={true} commentId={item?.id} blogId={blogId} setOpen={setOpenReplyInputs} />
                  }

                  {!item.parentId && Number(repliesComments(item?.id)?.length) > 0 && (
                    <Button
                      variant={"ghost"}
                      className="!bg-transparent !text-muted-foreground"
                      onClick={() => setShowReplies((prev) => ({
                        ...prev,
                        [item?.id]: !prev[item?.id],
                      }))}
                    >
                      {showReplies[item?.id] ? '--- Hide Replies' : '--- Show Replies'}{"  "}({Number(repliesComments(item?.id)?.length)})
                    </Button>
                  )}
                </div>

              </div>
              <LikeComment comment={item} />
            </div>
          }
          {showReplies[item?.id] && repliesComments(item?.id)?.map((comment: ExtendComment) => {
            return (
              <div key={comment?.id} className="w-full flex justify-between">
                <div className={cn("flex pb-5", "ml-[30px]")}>
                  <Avatar>
                    <AvatarImage
                      height={20}
                      width={20}
                      src={comment?.user?.image || ""}
                      alt="Avatar"
                    />
                    <AvatarFallback className="bg-sky-500">
                      <FaUser className="text-white" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="pl-2">
                    <div className="flex items-center space-x-1">
                      <h5 className="capitalize text-muted-foreground text-[16px] ">
                        {comment?.user?.name}
                      </h5>
                    </div>
                    <p className="text-black dark:text-white">
                      {comment?.content}
                    </p>
                    <div className="w-full flex items-center justify-start space-x-2">
                      <small className="text-muted-foreground text-[15px] font-medium">
                        {formatRelativeTime(comment?.createdAt)} •
                      </small>
                      <small className="text-muted-foreground text-[15px] font-medium">
                        likes •
                      </small>
                      <Button
                        variant={"ghost"}
                        className="!text-muted-foreground !bg-transparent flex !justify-start !p-0 "
                        onClick={() => setOpenReplyInputs((prev) => ({
                          ...prev,
                          [item?.id]: !prev[item?.id],
                        }))}
                      >
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
                <LikeComment comment={comment} />
              </div>
            )
          })}
        </div>
      ))}
    </div>
  );
});

BlogComments.displayName = "BlogComments";
