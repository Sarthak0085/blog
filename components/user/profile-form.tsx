import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import * as z from "zod";
import { ChangeEvent, useEffect, useState, useTransition } from "react"
import { ProfileSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { FaUser } from "react-icons/fa"
import { IoCameraOutline } from "react-icons/io5"
import { updateUserProfile } from "@/actions/user/update-profile"
import { toast } from "sonner"
import { FormSuccess } from "../form-success"
import { useSession } from "next-auth/react"
import { ExtendUser } from "@/nextauth"

interface ProfileFormProps {
    user: ExtendUser | null;
    refetch: () => void;
}

export const ProfileForm = ({ user, refetch }: ProfileFormProps) => {
    const { update } = useSession();
    const [success, setSuccess] = useState("");
    const [image, setImage] = useState(user?.image);
    const [isPending, startTransition] = useTransition();
    const currentUser = useCurrentUser();

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader?.result as string);
                console.log(form.getValues("image"));
            };
            reader.readAsDataURL(file);
            reader.onerror = (error) => {
                console.error("Error converting file to base64:", error);
            };
        }
    };

    const form = useForm<z.infer<typeof ProfileSchema>>({
        resolver: zodResolver(ProfileSchema),
        defaultValues: {
            userId: user?.id ?? "",
            name: user?.name ?? "",
            email: user?.email ?? "",
            bio: user?.bio ?? "",
            image: user?.image ?? "",
        }
    });

    const onSubmit = (values: z.infer<typeof ProfileSchema>) => {
        startTransition(() => {
            updateUserProfile(values)
                .then((data) => {
                    if (data?.error) {
                        toast.error(data?.error);
                    }
                    if (data?.success) {
                        toast.success(data?.success);
                        update();
                        refetch();
                    }
                    if (data?.data) {
                        setSuccess(data?.success);
                        refetch();
                    }
                })
                .catch(() => { toast.error("Unknown error While Upadting Profile") })
        })
    }

    useEffect(() => {
        form.setValue("image", image ?? "");
    }, [image]);

    const isMe = user?.id === currentUser?.id;

    const isOAuth = user?.id === currentUser?.id && currentUser?.OAuth;


    return (
        <Card className="w-[450px]">
            <CardHeader>
                <h2 className="text-2xl font-semibold text-center">Profile</h2>
            </CardHeader>
            <CardContent className="space-y-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="image"
                                render={(field) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex items-center justify-center">
                                                <Avatar className="relative !h-[130px] !w-[130px] border border-emerald-400">
                                                    <AvatarImage
                                                        src={image ?? ""}
                                                        alt="Avatar"
                                                    />
                                                    <AvatarFallback className="bg-sky-500">
                                                        <FaUser className="text-white" size={50} />
                                                    </AvatarFallback>
                                                    <div className="absolute bottom-3 right-3">
                                                        <Input
                                                            hidden
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={handleImageChange as any}
                                                            className="sr-only"
                                                            id="file-input"
                                                            readOnly={!isMe ? true : isOAuth ? true : false}
                                                        />
                                                        <FormLabel
                                                            htmlFor="file-input"
                                                            className="cursor-pointer"
                                                        >
                                                            <IoCameraOutline
                                                                color="black"
                                                                size={25}
                                                                title="Click Me For Uploading Avatar"
                                                                aria-label="Click Me"
                                                            />
                                                        </FormLabel>
                                                    </div>
                                                </Avatar>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                placeholder="How to start with Nextjs"
                                                type="text"
                                                readOnly={!isMe && true}
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
                                                {...field}
                                                disabled={isPending}
                                                placeholder="how-to-start-with-nextjs"
                                                type="text"
                                                readOnly={!isMe ? true : isOAuth ? true : false}
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
                                name="bio"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Bio</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                disabled={isPending}
                                                placeholder="Jane Doe is a passionate writer and digital nomad with a keen interest in technology,
                                                travel, and lifestyle. With over five years of experience in blogging, Jane shares her insights
                                                and experiences to inspire others to explore the world and embrace new adventures. When she’s 
                                                not writing, you can find her hiking in the mountains, experimenting with new recipes, or 
                                                curled up with a good book."
                                                rows={8}
                                                readOnly={!isMe && true}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormSuccess message={success} />
                        <Button type="submit" disabled={isPending} className="w-full">
                            Update
                        </Button>
                    </form>
                </Form>
            </CardContent >
        </Card>
    )
}