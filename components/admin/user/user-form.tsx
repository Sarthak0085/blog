import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EditUserSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { UserBlock, UserRole } from "@prisma/client";
import { Form, useForm } from "react-hook-form";
import { ExtendUser } from "@/nextauth";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CheckCircledIcon, LockClosedIcon } from "@radix-ui/react-icons";

export function UserForm({ data }: { data: ExtendUser }) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof EditUserSchema>>({
    resolver: zodResolver(EditUserSchema),
    defaultValues: {
      role: data?.role || "",
      isBlocked: data?.isBlocked || "",
    },
  });

  const onSubmit = (values: z.infer<typeof EditUserSchema>) => {
    console.log("values :", values);
    startTransition(() => {
      // editUser(values)
      //   .then((data) => {
      //     if (data?.success) {
      //       toast.success(data.success);
      //       router.push("/admin/get-users");
      //     }
      //     if (data?.error) {
      //       toast.error(
      //         data?.error || "An error occurred while creating the blog."
      //       );
      //     }
      //   })
      //   .catch((error) => {
      //     console.error("Error creating blog:", error);
      //     toast.error(
      //       "Something went wrong. Please try again after sometime."
      //     );
      //   });
    });
  };

  return (
    <Card>
      <CardHeader>
        <h2 className="text-2xl font-semibold text-center">Edit User</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem
                            value={UserRole.ADMIN}
                            className="text-red-500"
                          >
                            <span className="mr-2">👑</span>
                            ADMIN
                          </SelectItem>
                          <SelectItem
                            value={UserRole.USER}
                            className="text-gray-500"
                          >
                            <span className="mr-2">👤</span>
                            USER
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="isBlocked"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Block User</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={UserBlock.UNBLOCK}>
                            <CheckCircledIcon className="h-5 w-5 text-green-600 mr-2" />{" "}
                            <span className="text-green-600 font-bold">
                              Active
                            </span>
                          </SelectItem>
                          <SelectItem value={UserBlock.BLOCK}>
                            <LockClosedIcon className="h-5 w-5 text-red-600 mr-2" />
                            <span className="text-red-600 font-bold">
                              Blocked
                            </span>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={isPending} className="w-full">
              Edit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
