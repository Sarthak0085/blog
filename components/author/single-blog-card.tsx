import { ExtendBlog } from "@/utils/types";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export const SingleBlogCard = ({ blog }: { blog: ExtendBlog | null }) => {
    return (blog ?
        <Card className="flex items-center mb-4 max-h-[100px] shadow-md">
            <div className="w-1/3 flex items-center justify-center">
                <Image
                    src={blog?.imageUrl ?? ""}
                    alt={blog?.title}
                    className="w-[70px] h-[70px] object-cover rounded-full"
                    // layout="responsive"
                    width={20}
                    height={20}
                />
            </div>
            <CardContent className="w-2/3 p-4">
                <div>
                    <h3 title={blog?.title} className="text-lg font-bold mb-2">{blog?.title?.length > 40 ? `${blog?.title?.slice(0, 40)}...` : blog?.title}</h3>
                </div>
                <div>
                    <p className="text-gray-400 text-sm">{new Date(blog?.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit"
                    })}</p>
                </div>
            </CardContent>
        </Card>
        :
        <div className="flex items-center justify-center">
            No Blogs Found
        </div>
    )
}
