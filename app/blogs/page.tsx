import { Blogs } from "@/components/blogs/blogs";
import { Footer } from "@/components/footer";
import { Separator } from "@/components/ui/separator";

export default function BlogsPage() {
    return (
        <div className="w-full">
            <section className="py-10 bg-transparent">
                <div className="container w-[100%] mx-auto lg:px-2 px-6">
                    <div className="text-center mb-6">
                        <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-blue-500 to-purple-700">VortexVista Blogs</h1>
                        <p className="text-lg text-gray-600 my-2">Enjoy reading our latest articles and insights.</p>
                    </div>
                    <Separator />
                    <div className="flex flex-col lg:flex-row justify-between">
                        <Blogs />
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}