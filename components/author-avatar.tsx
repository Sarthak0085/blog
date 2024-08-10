import { FaUser } from "react-icons/fa"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const AuthorAvatar = ({ image }: { image?: string }) => {
    return (
        <Avatar className="w-[120px] h-[120px]">
            <AvatarImage
                src={image ?? ""}
                alt="Author Avatar"
            />
            <AvatarFallback className="bg-sky-500">
                <FaUser />
            </AvatarFallback>
        </Avatar>
    )
}