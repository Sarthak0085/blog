import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { FaUser } from "react-icons/fa"
import { Alegreya } from "next/font/google"
import { cn } from "@/lib/utils"
import { User } from "@prisma/client"

const alegraya = Alegreya({
    subsets: ["cyrillic", "latin"],
    weight: ["700", "800", "900"]
})

export const AboutAuthor = ({ user }: { user?: User | null }) => {
    return (
        <div className="relative flex justify-center min-h-[250px] items-center border border-black rounded-lg shadow-md">
            <div className="absolute top-0 -translate-y-1/2">
                <Avatar className="w-[120px] h-[120px]">
                    <AvatarImage
                        src={user?.image ?? ""}
                        alt="Avatar"
                    />
                    <AvatarFallback className="bg-sky-500">
                        <FaUser />
                    </AvatarFallback>
                </Avatar>
            </div>
            <div className="flex flex-col items-center justify-center mt-[50px]">
                <h3 className={cn("text-center text-2xl text-muted-foreground", alegraya.className)}>Published By <b className="pl-1">&ldquo;{user?.name}&rdquo;</b></h3>
                <p className="text-center text-muted-foreground mt-2">
                    {user?.bio}
                </p>
            </div>
        </div>
    )
}