import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FaArrowRight } from "react-icons/fa6"

export const Hero = () => {
    const backgroundImageUrl = "https://miro.medium.com/v2/format:webp/4*SdjkdS98aKH76I8eD0_qjw.png";
    return (
        <div className="flex">
            <div className="py-[2rem] pb-8 gap-4 flex flex-row items-center justify-between">
                <div className="lg:w-[60%] md:w-[90%] w-full flex flex-col justify-items-start space-y-10 px-10">
                    <h1 className="text-primary text-7xl font-bold leading-tight">
                        A Platform for <br /> Every Story:<br /> Blogs by You,<br /> for You
                    </h1>
                    <p className="text-muted-foreground text-2xl font-semibold">
                        A space where every voice matters, empowering users to share their unique
                        stories and insights through collaborative blogging
                    </p>
                    <div>
                        <Button
                            asChild
                            variant={"primary"}
                            className="text-xl !py-2 !px-5 w-auto"
                        >
                            <Link href={"/blogs"}>
                                Start Reading <FaArrowRight className="ms-2" />
                            </Link>
                        </Button>
                    </div>
                </div>
                <div
                    style={{
                        backgroundImage: `url(${backgroundImageUrl})`,
                    }}
                    className="hidden 900px:flex bg-cover bg-center pt-[5rem] overflow-x-hidden min-w-[50%] min-h-full bg-fixed flex-col justify-center items-center"
                ></div>
            </div>
        </div>
    )
}