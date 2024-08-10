"use client";

import { getAuthorById } from "@/actions/user/get-users";
import { BlogStatus } from "@prisma/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { AuthorAvatar } from "../author-avatar";
import { ExtendUserWithoutOAuth } from "@/utils/types";
import { FaRegEye, FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import { BookmarkIcon } from "@radix-ui/react-icons";
import { MdOutlineModeComment } from "react-icons/md";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AuthorCardSkeleton } from "@/components/loader/author-card-skeleton";

export const AuthorCard = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [data, setData] = useState<ExtendUserWithoutOAuth | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAuthorById(id as string);
                if (data?.error) {
                    setError(data?.error);
                }
                if (data?.data) {
                    setData(data?.data as unknown as ExtendUserWithoutOAuth);
                }
            } catch (error) {
                setError("Error while fetching user data");
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [id]);

    const publishedBlogs = data?.blogs?.filter((item) => item.status === BlogStatus.PUBLISHED);
    const totalLikes = publishedBlogs?.reduce((total, blog) => total + blog.likes.length, 0);
    const totalDislikes = publishedBlogs?.reduce((total, blog) => total + blog.dislikes.length, 0);
    const totalFavourites = publishedBlogs?.reduce((total, blog) => total + blog.favourites.length, 0);
    const totalSavedPosts = publishedBlogs?.reduce((total, blog) => total + blog.savedPosts.length, 0);
    const totalComments = publishedBlogs?.reduce((total, blog) => total + blog.comments.length, 0);
    const totalViews = publishedBlogs?.reduce((total, blog) => total + blog?.views, 0);

    if (isLoading) {
        return (
            <AuthorCardSkeleton />
        )
    }

    if (error) {
        return (
            <div className="w-full h-[100vh] flex items-center justify-center text-[red] font-bold text-3xl">
                {error}
            </div>
        );
    }

    return (
        <Card className="max-w-[720px] w-full m-4 shadow-md p-3">
            <CardHeader className="flex items-center justify-center">
                <AuthorAvatar image={data?.image ?? ""} />
            </CardHeader>
            <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-2">{data?.name}</h2>
                <p className="text-gray-600 mb-4">Email: <a href={`mailto:${data?.email}`} className="text-blue-500">{data?.email}</a></p>
                <p className="text-gray-700 mb-4">{data?.bio}</p>
                <p className="text-muted-foreground">Blogs Published: <span className="font-semibold">{publishedBlogs?.length}</span></p>
                <div className="flex flex-col space-y-3 my-2">
                    <p className="text-muted-foreground flex items-center gap-2">Total Views Across All Blogs (<FaRegEye color="blue" size={20} />) : <span className="font-semibold">{totalViews}</span></p>
                    <p className="text-muted-foreground flex items-center gap-2">
                        Total Likes Across All Blogs (<FaRegThumbsUp color="blue" size={18} />) : <span className="font-semibold">{totalLikes}</span></p>
                    <p className="text-muted-foreground flex items-center gap-2">Total Dislikes Across All Blogs (<FaRegThumbsDown color="blue" size={18} />): <span className="font-semibold">{totalDislikes}</span></p>
                    <p className="text-muted-foreground flex items-center gap-2">Total Posts Saved Across All Blogs (<BookmarkIcon height={18} width={18} />): <span className="font-semibold">{totalSavedPosts}</span></p>
                    <p className="text-muted-foreground flex items-center gap-2">Total Favourites Across All Blogs(<IoMdHeartEmpty color="red" size={20} />) : <span className="font-semibold">{totalFavourites}</span></p>
                    <p className="text-muted-foreground flex items-center gap-2">Total Comments Across All Blogs (<MdOutlineModeComment size={18} />): <span className="font-semibold">{totalComments}</span></p>
                </div>
            </CardContent>
            {/* <CardActions className="flex flex-col items-center p-4">
                    {socialLinks.map((link, index) => (
                        <Button
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mb-2 bg-blue-500 text-white hover:bg-blue-600"
                        >
                            {link.label}
                        </Button>
                    ))}
                </CardActions> */}
            <CardFooter className="flex justify-end">
                <Button
                    variant={"primary"}
                    asChild
                >
                    <Link href={`/contact/${data?.id}?name=${data?.name}`} className="!font-semibold">
                        Contact Me
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}