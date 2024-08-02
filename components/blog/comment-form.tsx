import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import * as z from "zod";
import { CreateCommentSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { createComment } from "@/actions/comments/create-comment";
import { toast } from "sonner";

interface CommentFormProps {
    isReply?: boolean;
    commentId?: string | null;
    blogId?: string;
    setOpen?: (updater: (prev: Record<string, boolean>) => Record<string, boolean>) => void;
}

export const CommentForm = ({
    isReply = false,
    commentId,
    blogId,
    setOpen
}: CommentFormProps) => {

    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof CreateCommentSchema>>({
        resolver: zodResolver(CreateCommentSchema),
        defaultValues: {
            parentId: String(commentId) ?? null,
            blogId: String(blogId)
        }
    });

    const onSubmit = (values: z.infer<typeof CreateCommentSchema>) => {
        startTransition(() => {
            createComment(values)
                .then((data) => {
                    if (data?.success) {
                        setOpen && setOpen((prev) => ({
                            ...prev,
                            [commentId as string]: !prev[commentId as string],
                        }));
                        window.location.reload();
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mb-4">
                <div className="space-y-4 relative">
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
                                        rows={isReply ? 4 : 8}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        disabled={isPending}
                        className="!absolute w-auto right-2 bottom-2"
                    >
                        Send
                    </Button>
                </div>
            </form>
        </Form>
    )
}