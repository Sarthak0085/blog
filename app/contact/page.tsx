import { ContactForm } from "@/components/contact/contact-form";
import { Footer } from "@/components/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact",
    openGraph: {
        title: "Contact",
        url: "https://vortex-vista.vercel.app/contact",
        images: ["https://vortex-vista.vercel.app/opengraph-image.png"]
    }
}

export default function ContactPage() {
    return (
        <div className="w-full">
            <div className="w-full my-10 items-center justify-center">
                <ContactForm />
            </div>
            <Footer />
        </div>
    )
}