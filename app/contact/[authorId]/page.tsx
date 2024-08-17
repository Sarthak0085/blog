import { ContactForm } from "@/components/contact/contact-form";
import { Footer } from "@/components/footer";

interface ContactPageProps {
    params: { authorId: string }
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