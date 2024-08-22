import { ExtendBlog } from "@/utils/types";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { formatDate } from "@/lib/date-format";
import { Button } from "../ui/button";
import { FaArrowRight } from "react-icons/fa";

export const BlogCard = ({ data }: { data: ExtendBlog }) => {
    return (
        <Card key={data?.id} className="w-full relative bg-gradient-to-br from-purple-300 to-emerald-200 min-h-[250px] max-h-[500px] max-w-[400px] border-[2px] shadow-md shadow-[#00000000d]">
            <CardContent className="mb-4">
                <div className="flex flex-col pt-8 items-center justify-between gap-6">
                    <div className="flex items-center justify-center">
                        <Image
                            src={data?.imageUrl ?? ""}
                            alt={data?.slug}
                            className="w-full object-fill rounded-md"
                            height={180}
                            width={180}
                        />
                    </div>
                    <div className="min-h-[100px] space-y-2 flex-1">
                        <div className="flex flex-col">
                            <h2 className="break-words text-xl">{data?.title}</h2>
                            <div className="flex text-[14px]">
                                <div className={cn("flex items-start space-x-1")}>
                                    <Link href={`/author/${data?.user?.id}`}>
                                        <span className="text-muted-foreground hover:text-[#0675c4]  capitalize cursor-pointer text-[13px]">
                                            {data?.user?.name}
                                        </span>
                                    </Link>
                                    <span>·</span>
                                    <Link href={`/blogs?category=${data?.category?.name}`}>
                                        <span className="text-muted-foreground hover:text-[#0675c4]  cursor-pointer text-[13px]">
                                            {data?.category?.name}
                                        </span>
                                    </Link>
                                    <span>·</span>
                                    <Link href={`/blogs?date=${data?.createdAt}`}>
                                        <span className="text-muted-foreground hover:text-[#0675c4]  cursor-pointer text-[13px]">
                                            {formatDate(data?.createdAt)}
                                        </span>
                                    </Link>
                                    <span>·</span>
                                    <Link href={`/blogs?time=${data?.read_time}`}>
                                        <span className="text-muted-foreground hover:text-[#0675c4]  cursor-pointer text-[13px]">
                                            {data?.read_time !== 1 ? `${data?.read_time} mins` : `${data?.read_time} min`}
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <p className={cn("mb-[10px] text-wrap")}>
                            {data?.shortSummary.length > 150 ? `${data?.shortSummary.slice(0, 150)}...` : data?.shortSummary}
                        </p>
                    </div>
                </div>
                <Button
                    asChild
                    variant={"primary"}
                    className="absolute right-2 bottom-2"
                >
                    <Link href={`/blog/${data?.slug}`} passHref>
                        Read More <FaArrowRight className="ms-2" />
                    </Link>
                </Button>
            </CardContent>
        </Card>
    )
}