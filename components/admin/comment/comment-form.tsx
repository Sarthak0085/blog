"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { UpdateCommentSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useState, useTransition } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { updateComment } from "@/actions/comments/update-comment";

interface CategoryFormProps {
  initialValues?: {
    id: string;
    blogId: string;
    parentId: string | null;
    content: string;
  };
  setOpen: (open: boolean) => void;
}

export const CommentForm = ({ initialValues, setOpen }: CategoryFormProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof UpdateCommentSchema>>({
    resolver: zodResolver(UpdateCommentSchema),
    defaultValues: {
      id: initialValues?.id || "",
      blogId: initialValues?.blogId || "",
      content: initialValues?.content || "",
      parentId: initialValues?.parentId as any,
    },
  });

  const onSubmit = (values: z.infer<typeof UpdateCommentSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      updateComment(values)
        .then((data) => {
          if (data?.error) {
            setError(data?.error);
          }
          if (data?.success) {
            setSuccess(data?.success);
            setOpen(false);
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <div className="w-full flex flex-col items-center justify-center">
          <h2 className="text-muted-foreground text-sm">Edit Comment</h2>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter Comment</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Keep it up bro."
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button type="submit" disabled={isPending} className="w-full">
              Edit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
