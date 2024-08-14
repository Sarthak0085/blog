import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import * as z from "zod";
import { CreateCommentSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { createComment } from "@/actions/comments/create-comment";
import { toast } from "sonner";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { cn } from "@/lib/utils";
import LoginButton from "../auth/login-button";

interface CommentFormProps {
    isReply?: boolean;
    isBlogCard?: boolean;
    commentId?: string | null;
    blogId?: string;
    refetch: () => void;
    setOpen?: (updater: (prev: Record<string, boolean>) => Record<string, boolean>) => void;
}

export const CommentForm = ({
    isReply = false,
    isBlogCard = false,
    commentId,
    blogId,
    setOpen,
    refetch
}: CommentFormProps) => {
    const user = useCurrentUser();
    const [isPending, startTransition] = useTransition();
    const [openLoginModal, setOpenLoginModal] = useState(false);

    const form = useForm<z.infer<typeof CreateCommentSchema>>({
        resolver: zodResolver(CreateCommentSchema),
        defaultValues: {
            parentId: String(commentId) ?? null,
            blogId: String(blogId),
            content: "",
        }
    });

    const onSubmit = (values: z.infer<typeof CreateCommentSchema>) => {
        startTransition(() => {
            user && createComment(values)
                .then((data) => {
                    if (data?.success) {
                        setOpen && setOpen((prev) => ({
                            ...prev,
                            [commentId as string]: !prev[commentId as string],
                        }));
                        form.reset();
                        refetch();
                    }
                    if (data?.error) {
                        toast.error(data?.error)
                    }
                })
                .catch(() => toast.error("Something went wrong"));
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 shadow-md mb-4">
                <div className="relative">
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        disabled={isPending}
                                        placeholder="Add your Comment here!"
                                        rows={isReply ? 4 : isBlogCard ? 2 : 8}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button
                        type={"submit"}
                        onClick={() => !user && setOpenLoginModal(true)}
                        disabled={isPending}
                        className={cn("!absolute w-auto bottom-1 right-2", isPending && "cursor-not-allowed")}
                    >
                        Send
                    </Button>
                </div>
            </form>
            {openLoginModal && <LoginButton open={openLoginModal} setOpen={setOpenLoginModal} asChild={true} mode="Modal" />}
        </Form >
    )
}