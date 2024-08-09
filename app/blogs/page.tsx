import { Blogs } from "@/components/blog/blogs";
import { CategoriesList } from "@/components/blog/categories-list";
import { TagsLists } from "@/components/blog/tags-list";
import { Separator } from "@/components/ui/separator";

export default function BlogsPage() {
    return (
        // <section className="py-10 bg-transparent">
        //     <div className="container w-[100%] mx-auto max-w-[720px] px-6">
        //         <div className="text-center mb-6">
        //             <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-blue-500 to-purple-700">VortexVista Blogs</h1>
        //             <p className="text-lg text-gray-600 my-2">Enjoy reading our latest articles and insights.</p>
        //         </div>
        //         <Separator />
        //         <div className="my-8 w-full overflow-auto">
        //             <CategoriesList />
        //         </div>
        //         <Blogs />
        //     </div>
        // </section>
        <section className="py-10 bg-transparent">
            <div className="container w-[100%] mx-auto lg:px-2 px-6">
                <div className="text-center mb-6">
                    <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-blue-500 to-purple-700">VortexVista Blogs</h1>
                    <p className="text-lg text-gray-600 my-2">Enjoy reading our latest articles and insights.</p>
                </div>
                <Separator />
                <div className="flex flex-col lg:flex-row justify-between">
                    <div className="lg:w-[75%] flex flex-col items-center justify-center">
                        <CategoriesList />
                        <Blogs />
                    </div>

                    <div className="hidden lg:block lg:w-[25%] mt-8">
                        <TagsLists />
                        {/* <div>
                            <h2 className="text-2xl font-bold mb-4">Author</h2>
                            <AuthorInfo /> 
                        </div> */}
                    </div>
                </div>
            </div>
        </section>

    )
}