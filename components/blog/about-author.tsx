import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { FaUser } from "react-icons/fa"
import { Alegreya } from "next/font/google"
import { cn } from "@/lib/utils"
import { User } from "@prisma/client"
import Link from "next/link"
import { Button } from "../ui/button"
import { AiOutlineArrowRight } from "react-icons/ai"
import { FaArrowRight } from "react-icons/fa6"

const alegraya = Alegreya({
    subsets: ["cyrillic", "latin"],
    weight: ["700", "800", "900"]
})

export const AboutAuthor = ({ author }: { author?: User | null }) => {
    return (
        <div className="relative flex justify-center min-h-[250px] items-center border border-black rounded-lg shadow-md">
            <div className="absolute top-0 -translate-y-1/2">
                <Avatar className="w-[120px] h-[120px]">
                    <AvatarImage
                        src={author?.image ?? ""}
                        alt="Avatar"
                    />
                    <AvatarFallback className="bg-sky-500">
                        <FaUser />
                    </AvatarFallback>
                </Avatar>
            </div>
            <div className="flex flex-col items-center justify-center gap-3 mt-[50px]">
                <div>
                    <h3 className={cn("text-center text-2xl text-muted-foreground", alegraya.className)}>Published By <b>&ldquo;<Link href={`/author/${author?.id}`} className="text-blue-800 hover:underline">{author?.name}</Link>&rdquo;</b></h3>
                    <p className="text-center text-muted-foreground mt-2">
                        {author?.bio}
                    </p>
                </div>
                <Button
                    variant={"outline"}
                    asChild
                    className="!pt-2 hover:bg-sky-500"
                >
                    <Link href={`blogs?authorId=${author?.id}`}>
                        View Posts <FaArrowRight size={14} className="ms-2" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}