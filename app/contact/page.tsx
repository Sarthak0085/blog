import { ContactForm } from "@/components/contact/contact-form";
import { Footer } from "@/components/footer";

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