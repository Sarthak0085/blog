"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { CreateCategorySchema, UpdateCategorySchema } from "@/schemas";
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
import { createCategory } from "@/actions/category/create-category";
import { updateCategory } from "@/actions/category/update-category";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface CategoryFormProps {
  isUpdate?: boolean;
  initialValues?: { id: string; name: string; userId: string };
  setOpen: (open: boolean) => void;
}

type CategoryFormValues =
  | z.infer<typeof CreateCategorySchema>
  | z.infer<typeof UpdateCategorySchema>;

export const CategoryForm = ({
  isUpdate = false,
  initialValues,
  setOpen,
}: CategoryFormProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(
      isUpdate ? UpdateCategorySchema : CreateCategorySchema
    ),
    defaultValues: {
      name: initialValues?.name || "",
      ...(isUpdate && {
        categoryId: initialValues?.id || "",
        userId: initialValues?.userId || "",
      }),
    },
  });

  console.log("error: ", error);

  const onSubmit = (values: CategoryFormValues) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      if (isUpdate) {
        updateCategory({
          name: form.getValues("name"),
          categoryId: form.getValues("categoryId"),
          userId: form.getValues("userId"),
        })
          .then((data) => {
            if (data?.error) {
              setError(data?.error);
            }
            if (data?.success) {
              setSuccess(data?.success);
              setOpen(false);
              window.location.reload();
            }
          })
          .catch(() => setError("Something went wrong"));
      } else {
        createCategory(values)
          .then((data) => {
            if (data?.error) {
              setError(data?.error);
            }
            if (data?.success) {
              setSuccess(data?.success);
              window.location.reload();
            }
          })
          .catch(() => setError("Something went wrong"));
      }
    });
  };

  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <div className="w-full flex flex-col items-center justify-center">
          <h2 className="text-muted-foreground text-sm">
            {isUpdate ? "Update Category" : "Create Category"}
          </h2>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter Category Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Next Js"
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
              {isUpdate ? "Update" : "Create"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
