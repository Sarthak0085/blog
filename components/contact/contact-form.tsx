"use client";

import { ContactSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";
import { contact } from "@/actions/contact";
import { toast } from "sonner";
import { useParams, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const subjects = [
    'General Inquiry',
    'Support Request',
    'Feedback',
    'Bug Report',
    'Partnership Opportunity',
    'Feature Request',
    'Billing or Subscription',
    'Account Issues',
    'Other'
];

const authorSubjects = [
    'Question about a specific article',
    'Request for collaboration',
    'Feedback on content',
    'Correction of content',
    'Request for an interview',
    'General inquiry',
    'Other',
];

export const ContactForm = () => {
    const { authorId } = useParams();
    const searchParams = useSearchParams();
    const authorName = searchParams.get("name") as string;
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof ContactSchema>>({
        resolver: zodResolver(ContactSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
            subject: "",
            ...(authorId && {
                authorId: authorId as string,
                authorName: authorName ?? "",
                blogTitle: "",
            }),
        }
    });

    const onSubmit = (values: z.infer<typeof ContactSchema>) => {
        startTransition(() => {
            contact(values)
                .then((data) => {
                    if (data?.success) {
                        toast.success(data?.success);
                        form.reset();
                    }
                    if (data?.error) {
                        toast.error(data?.error);
                    }
                }).catch(() => toast.error("An Unknown error occur while form submission."))
        })
    }

    return (
        <div className="lg:max-w-[90%] w-full sm:max-w-[70%] mx-auto p-4 bg-white/25 shadow-md rounded-lg gap-4 flex flex-col lg:flex-row">
            <div className="lg:w-[60%] w-full flex justify-center items-center lg:pr-4 mb-4 lg:mb-0">
                <Image
                    src={"/contact-us.jpg"}
                    alt="Contact"
                    className="w-auto h-auto rounded-lg"
                    layout="responsive"
                    width={1200}
                    height={800}
                />
            </div>
            <div className="lg:w-[40%] w-full">
                <h2 className="text-3xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-blue-500 to-purple-700">
                    Contact {authorName ? `"${authorName}"` : "Us"}
                </h2>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {authorName && <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="authorName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Author Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="authorName"
                                                {...field}
                                                disabled={isPending}
                                                placeholder="Kevin Peter"
                                                type="text"
                                                className="border border-gray-400"
                                                readOnly
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        }
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="name"
                                                {...field}
                                                disabled={isPending}
                                                placeholder="John Doe"
                                                type="text"
                                                className="border border-gray-400"
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
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="email"
                                                {...field}
                                                disabled={isPending}
                                                placeholder="john.doe@gmail.com"
                                                type="email"
                                                className="border border-gray-400"
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
                                name="subject"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Subject</FormLabel>
                                        <FormControl>
                                            <Select
                                                disabled={isPending}
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <SelectTrigger
                                                    className="border border-gray-400"
                                                >
                                                    <SelectValue
                                                        placeholder="Select a subject"
                                                    />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {authorId ? authorSubjects?.map((subject, index) => (
                                                        <SelectItem
                                                            id="subject"
                                                            key={index}
                                                            value={subject}
                                                        >
                                                            {subject}
                                                        </SelectItem>
                                                    )) : subjects?.map((subject, index) => (
                                                        <SelectItem
                                                            id="subject"
                                                            key={index}
                                                            value={subject}
                                                        >
                                                            {subject}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>

                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        {(authorId || authorName) && <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="blogTitle"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Blog Slug (Optional)</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="blogTitle"
                                                {...field}
                                                disabled={isPending}
                                                placeholder="get_started_with_nextjs"
                                                type="text"
                                                className="border border-gray-400"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>}
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Message</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                disabled={isPending}
                                                id="message"
                                                {...field}
                                                placeholder="Enter your message"
                                                rows={5}
                                                className={cn(`border-gray-300 rounded-md shadow-sm`)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit" disabled={isPending} className={cn("w-full", isPending && "cursor-not-allowed")}>
                            Send
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}