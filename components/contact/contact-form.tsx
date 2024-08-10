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
import { Separator } from "../ui/separator";
import { contact } from "@/actions/contact";
import { toast } from "sonner";

interface ContactFormProps {
    authorId?: string;
    authorName?: string;
}


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

export const ContactForm = ({ authorId, authorName }: ContactFormProps) => {
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof ContactSchema>>({
        resolver: zodResolver(ContactSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
            ...(authorId && {
                authorId: authorId
            }),
        }
    });

    const onSubmit = (values: z.infer<typeof ContactSchema>) => {
        console.log(values);
        startTransition(() => {
            contact(values)
                .then((data) => {
                    if (data?.success) {
                        toast.success(data?.success);
                    }
                    if (data?.error) {
                        toast.error(data?.error);
                    }
                }).catch(() => toast.error("An Unknown error occur while form submission."))
        })
    }

    return (
        <div className="max-w-[90%] mx-auto p-4 bg-transparent shadow-md rounded-lg gap-4 flex flex-col md:flex-row">
            <div className="md:w-[60%] flex justify-center items-center md:pr-4 mb-4 md:mb-0">
                <Image
                    src={"/contact-us.jpg"}
                    alt="Contact"
                    className="w-auto h-auto rounded-lg"
                    layout="responsive"
                    width={1200}
                    height={800}
                />
            </div>
            {/* <Separator /> */}
            <div className="md:w-[40%]">
                <h2 className="text-3xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-blue-500 to-purple-700">
                    Contact {authorName ? authorName : "Us"}
                </h2>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                                                className={`border-gray-300 rounded-md shadow-sm`}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit" disabled={isPending} className="w-full">
                            Send
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}