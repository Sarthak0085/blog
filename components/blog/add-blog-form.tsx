"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddBlogSchema } from "@/schemas";
import * as z from "zod";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import MarkdownEditor from "react-markdown-editor-lite";
import ReactMarkdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BlogStatus } from "@prisma/client";
import { createBlog } from "@/actions/create-blog";
import { toast } from "sonner";

export const AddBlogForm = () => {
  // const [error, setError] = useStat<string | undefined>("");
  // const [success, setSuccess] = useState<string | undefined>("");
  // const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [content, setContent] = useState("");

  const form = useForm<z.infer<typeof AddBlogSchema>>({
    resolver: zodResolver(AddBlogSchema),
    defaultValues: {
      title: "",
      slug: "",
      content: "",
      category: "",
      shortSummary: "",
      tags: "",
      status: BlogStatus.DRAFT,
    },
  });

  const generateSlug = (title: string) => {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    return slug;
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const title = event.target.value;
    form.setValue("title", title);
    form.setValue("slug", generateSlug(title));
  };

  const changeHandleContent = (e: any) => {
    setContent(e.text);
    form.setValue("content", content);
  };

  const onSubmit = (values: z.infer<typeof AddBlogSchema>) => {
    console.log("values :", values);
    startTransition(() => {
      createBlog(values)
        .then((data) => {
          if (data.success) {
            toast.success(data.success);
          } else {
            toast.error(data?.error);
          }
        })
        .catch(() =>
          toast.error("Something went wrong. Please try again after sometime.")
        );
    });
  };

  return (
    <Card className="w-full min-h-full max-w-[900px] bg-transparent">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">Add New Blog</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="How to start with Nextjs"
                        type="text"
                        onChange={handleTitleChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="how-to-start-with-nextjs"
                        type="text"
                        readOnly
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="shortSummary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short Summary</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        disabled={isPending}
                        placeholder="In this blog detail is given about the nextjs app. What is nextjs?
                         How to Start with nextjs and So on..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <MarkdownEditor
                        {...field}
                        value={content}
                        onChange={(e) => changeHandleContent(e)}
                        className="w-full h-[400px] bg-transparent"
                        renderHTML={(text) => (
                          <ReactMarkdown
                            components={{
                              code: ({
                                node,
                                inline,
                                className,
                                children,
                                ...props
                              }) => {
                                const match = /language-(\w+)/.exec(
                                  className || ""
                                );
                                if (inline) {
                                  return <code>{children}</code>;
                                } else if (match) {
                                  return (
                                    <div className="relative">
                                      <pre
                                        className="p-0 border-[5px] overflow-x-auto whitespace-pre-wrap"
                                        {...props}
                                      >
                                        <code>{children}</code>
                                      </pre>
                                      <button
                                        className="absolute top-0 right-0 z-1"
                                        onClick={() =>
                                          navigator.clipboard.writeText(
                                            children
                                          )
                                        }
                                      >
                                        Copy Code
                                      </button>
                                    </div>
                                  );
                                } else {
                                  return <code {...props}>{children}</code>;
                                }
                              },
                            }}
                          >
                            {text}
                          </ReactMarkdown>
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        disabled={isPending}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={"React"}>React</SelectItem>
                          <SelectItem value={"Next Js"}>Next Js</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Enter comma separated tag (Eg :- React, NextJs, Javascript)"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select
                        disabled={isPending}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={BlogStatus.DRAFT}>
                            DRAFT
                          </SelectItem>
                          <SelectItem value={BlogStatus.PUBLISHED}>
                            PUBLISHED
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={isPending} className="w-full">
              Create
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
