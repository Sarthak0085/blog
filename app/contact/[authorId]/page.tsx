import { ContactForm } from "@/components/contact/contact-form";
import { Footer } from "@/components/footer";
import { Metadata } from "next";

interface ContactPageProps {
    params: { authorId: string };
}

export async function generateMetadata({
    params: { authorId },
}: ContactPageProps): Promise<Metadata> {
    return {
        title: "Author's Contact",
        openGraph: {
            title: "Author's Contact",
            url: `https://vortex-vista.vercel.app/contact/${authorId}`,
            images: ["https://vortex-vista.vercel.app/opengraph-image.png"]
        }
    }
}

export default function ContactPage({ params: { authorId } }: ContactPageProps) {
    return (
        <div className="w-full">
            <div className="w-full my-10 items-center justify-center">
                <ContactForm />
            </div>
            <Footer />
        </div>
    )
}