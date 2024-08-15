import Image from "next/image"
import { Button } from "./ui/button"
import Link from "next/link"

export const Hero = () => {
    return (
        <div className="w-[80%] mt-[2rem] max-h-7xl mb-8 flex items-center justify-between">
            <div className="w-[60%] flex flex-col justify-items-start space-y-10 px-10">
                <h1 className="text-primary text-7xl font-bold leading-tight">
                    A Platform for <br /> Every Story:<br /> Blogs by You,<br /> for You
                </h1>
                <p className="text-muted-foreground text-2xl font-semibold">
                    A space where every voice matters, empowering users to share their unique
                    stories and insights through collaborative blogging
                </p>
                <div>
                    <Button
                        variant={"default"}
                        className="!bg-blue-600 text-xl !py-2 !px-5 w-auto"
                    >
                        <Link href={"/blogs"}>
                            Start Reading
                        </Link>
                    </Button>
                </div>
            </div>
            <div>
                <Image
                    src={"https://miro.medium.com/v2/format:webp/4*SdjkdS98aKH76I8eD0_qjw.png" ?? ""}
                    alt="Hero"
                    className="w-[400px] h-full object-cover"
                    width={200}
                    height={200}
                />
            </div>
        </div>
    )
}