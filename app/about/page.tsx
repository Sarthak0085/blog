import { Footer } from "@/components/footer";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
    title: "About"
}

export default function AboutPage() {
    return (
        <div className="w-full">
            <section className="py-10 bg-transparent">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-blue-500 to-purple-700">About Us</h1>
                        <p className="mt-2 text-lg text-gray-600">
                            Discover the story behind Vortex Vista and our mission to bring you engaging content.
                        </p>
                    </div>
                    <div className="flex flex-col md:flex-row md:space-x-8">
                        <div className="md:w-1/2 mb-6 md:mb-0">
                            <Image
                                src="https://via.placeholder.com/600x400"
                                alt="Vortex Vista Team"
                                className="w-full h-auto rounded-lg shadow-lg"
                                width={200}
                                height={200}
                            />
                        </div>
                        <div className="md:w-1/2">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                Our Story
                            </h2>
                            <p className="text-gray-700 mb-4">
                                Welcome to Vortex Vista, a space where creativity meets insight. Our blog was created with the vision
                                to provide readers with thought-provoking content on various topics ranging from technology and lifestyle
                                to travel and personal development. We believe in the power of storytelling to inspire and inform, and
                                we’re dedicated to curating high-quality articles that resonate with our audience.
                            </p>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                Our Mission
                            </h3>
                            <p className="text-gray-700 mb-4">
                                At Vortex Vista, our mission is to offer a refreshing perspective on the subjects that matter most.
                                We aim to foster a community of curious minds who are passionate about exploring new ideas and engaging
                                with compelling narratives. Our goal is to be a reliable source of inspiration and knowledge, enriching
                                the lives of our readers one article at a time.
                            </p>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                Meet the Team
                            </h3>
                            <p className="text-gray-700">
                                Our team is composed of dedicated writers, researchers, and creatives who bring diverse experiences
                                and expertise to the table. Together, we strive to create content that not only informs but also
                                inspires our readers to see the world through a new lens.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}