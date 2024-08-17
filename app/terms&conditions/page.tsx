import { Footer } from "@/components/footer";
import { domain } from "@/lib/domain";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms & Conditions",
    robots: {
        index: false,
        follow: true,
    }
}

export default function TermsAndConditionsPage() {
    return (
        <div className="w-full">
            <section className="py-10">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-blue-500 to-purple-700">Terms and Conditions</h1>
                        <p className="mt-2 text-lg text-gray-600">Please read these terms and conditions carefully before using our website.</p>
                    </div>
                    <div className="prose lg:prose-xl mx-auto text-gray-700 space-y-2">
                        <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">1. Introduction</h2>
                        <p>Welcome to Vortex Vista. These Terms and Conditions (&quot;Terms&quot;) govern your use of our website located at {domain} (the &quot;Site&quot;). By accessing or using the Site, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use the Site.</p>

                        <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">2. Use of Site</h2>
                        <p>You agree to use the Site only for lawful purposes and in a manner that does not infringe the rights of, or restrict or inhibit the use and enjoyment of the Site by, any third party. Prohibited behavior includes harassment, posting offensive or obscene content, and distributing viruses.</p>

                        <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">3. Intellectual Property</h2>
                        <p>The content on the Site, including but not limited to text, graphics, logos, images, and software, is the property of Vortex Vista or its content suppliers and is protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or otherwise use any content from the Site without our express written consent.</p>

                        <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">4. User-Generated Content</h2>
                        <p>By submitting content to the Site, such as comments, reviews, or other user-generated content, you grant Vortex Vista a non-exclusive, royalty-free, perpetual, and worldwide license to use, reproduce, modify, publish, and distribute such content. You represent and warrant that you have the right to grant this license.</p>

                        <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">5. Links to Other Websites</h2>
                        <p>The Site may contain links to third-party websites that are not owned or controlled by Vortex Vista. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites. You acknowledge and agree that Vortex Vista is not responsible or liable for any damage or loss caused by or in connection with the use of any third-party websites.</p>

                        <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">6. Disclaimers</h2>
                        <p>The Site is provided on an &quot;as-is&quot; and &quot;as-available&quot; basis. Vortex Vista makes no warranties or representations, express or implied, regarding the Site or the content, including but not limited to the accuracy, reliability, or completeness of the information. Your use of the Site is at your own risk.</p>

                        <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">7. Limitation of Liability</h2>
                        <p>To the fullest extent permitted by law, Vortex Vista shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data or use, resulting from your use of the Site or any content on the Site.</p>

                        <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">8. Indemnification</h2>
                        <p>You agree to indemnify, defend, and hold harmless Vortex Vista, its affiliates, officers, directors, employees, and agents from and against any and all claims, liabilities, damages, losses, and expenses, including reasonable attorneys&lsquo; fees, arising out of or in connection with your use of the Site or any violation of these Terms.</p>

                        <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">9. Changes to These Terms</h2>
                        <p>Vortex Vista reserves the right to modify these Terms at any time. We will post any changes to these Terms on this page and update the effective date. Your continued use of the Site after any changes constitutes your acceptance of the new Terms.</p>

                        <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">10. Governing Law</h2>
                        <p>These Terms are governed by and construed in accordance with the laws of the state or jurisdiction where Vortex Vista is based, without regard to its conflict of law principles. Any disputes arising out of or in connection with these Terms shall be resolved in the courts of that state or jurisdiction.</p>

                        <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">11. Contact Us</h2>
                        <p>If you have any questions about these Terms, please contact us at:</p>
                        <p>Email: <a href="mailto:info@vortexvista.com" className="text-blue-600 hover:underline">info@vortexvista.com</a></p>
                        <p>Address: 123 Example St, Suite 456, City, State, ZIP</p>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}