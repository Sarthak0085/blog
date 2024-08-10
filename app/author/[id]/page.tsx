import { AuthorCard } from "@/components/author/author-card";
import { BlogsList } from "@/components/author/blogs-list";
import { Separator } from "@/components/ui/separator";

export default function BlogsPage() {
    return (
        <section className="py-10 bg-transparent">
            <div className="container w-[100%] mx-auto lg:px-2 px-6">
                <div className="text-center mb-6">
                    <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-blue-500 to-purple-700">About Author</h1>
                    <p className="text-lg text-gray-600 my-2">Discover expert insights and valuable tips from our seasoned writer.</p>
                </div>
                <Separator />
                <div className="flex flex-col lg:flex-row lg:space-x-5 lg:space-y-0 space-y-5 justify-between">
                    <div className="lg:w-[65%] flex flex-col items-center justify-center">
                        <AuthorCard />
                    </div>
                    <div className="hidden lg:block lg:w-[35%]">
                        <BlogsList />
                    </div>
                </div>
            </div>
        </section>

    )
}