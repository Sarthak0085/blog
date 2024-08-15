import { Footer } from "@/components/footer";
import { domain } from "@/lib/domain";

export default function PrivacyPolicyPage() {
    return (
        <div className="w-full">
            <section className="py-10">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-blue-500 to-purple-700">Privacy Policy</h1>
                        <p className="mt-2 text-lg text-gray-600">Your privacy is important to us. This policy explains how we collect, use, and protect your information.</p>
                    </div>
                    <div className="prose lg:prose-xl mx-auto text-gray-700 space-y-3">
                        <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">1. Introduction</h2>
                        <p>Welcome to Vortex Vista. We are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, {domain} (the &quot;Site&quot;).</p>

                        <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">2. Information We Collect</h2>
                        <p>We may collect the following types of information:</p>
                        <ul>
                            <li><strong>Personal Data:</strong> Includes your name, email address, and other information you provide voluntarily when you register or contact us.</li>
                            <li><strong>Usage Data:</strong> Includes data on how you interact with the Site, such as IP address, browser type, and pages visited.</li>
                            <li><strong>Cookies:</strong> We use cookies to enhance your experience. You can control cookie settings through your browser.</li>
                        </ul>
                        <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">3. How We Use Your Information</h2>
                        <p>We use the information we collect to:</p>
                        <ul>
                            <li>Provide and maintain our Site</li>
                            <li>Improve and personalize your experience</li>
                            <li>Respond to your comments, questions, and requests</li>
                            <li>Monitor and analyze usage and trends</li>
                            <li>Send you updates, newsletters, and marketing communications</li>
                        </ul>

                        <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">4. How We Share Your Information</h2>
                        <p>We may share your information with:</p>
                        <ul>
                            <li><strong>Service Providers:</strong> We may share your information with third-party service providers who assist us in operating the Site and providing services.</li>
                            <li><strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities.</li>
                            <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred to the new entity.</li>
                        </ul>

                        <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">5. Your Choices</h2>
                        <p>You have choices regarding your information:</p>
                        <ul>
                            <li><strong>Access and Update:</strong> You can access and update your personal information by contacting us.</li>
                            <li><strong>Opt-Out:</strong> You can opt-out of receiving marketing communications from us by following the unsubscribe instructions provided in those communications.</li>
                            <li><strong>Cookies:</strong> You can manage your cookie preferences through your browser settings.</li>
                        </ul>

                        <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">6. Security</h2>
                        <p>We implement reasonable security measures to protect your information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.</p>

                        <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">7. Children&#39;s Privacy</h2>
                        <p>The Site is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will take steps to delete it.</p>

                        <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">8. Changes to This Privacy Policy</h2>
                        <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>

                        <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">9. Contact Us</h2>
                        <p>If you have any questions or concerns about this Privacy Policy, please contact us at:</p>
                        <p>Email: <a href="mailto:info@vortexvista.com" className="text-blue-600 hover:underline">info@vortexvista.com</a></p>
                        <p>Address: 123 Example St, Suite 456, City, State, ZIP</p>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}