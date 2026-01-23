import Link from "next/link";

export default function FAQPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-6xl">
            <div className="mb-16 text-center">
                <h1 className="text-4xl font-bold mb-4">We have answers</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    It would really be an LLM, but we are waiting for RAG to truly reach the
                    commodity product stage before we look into it.
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-12">
                {/* Sidebar Navigation */}
                <aside className="md:w-1/4">
                    <nav className="sticky top-24 space-y-2">
                        <Link
                            href="#about"
                            className="block p-2 hover:bg-accent rounded-lg transition-colors font-medium text-muted-foreground hover:text-foreground"
                        >
                            About the Platform
                        </Link>
                        <Link
                            href="#pricing"
                            className="block p-2 hover:bg-accent rounded-lg transition-colors font-medium text-muted-foreground hover:text-foreground"
                        >
                            Pricing & Plans
                        </Link>
                        <Link
                            href="#support"
                            className="block p-2 hover:bg-accent rounded-lg transition-colors font-medium text-muted-foreground hover:text-foreground"
                        >
                            Support & Assistance
                        </Link>
                        <Link
                            href="#security"
                            className="block p-2 hover:bg-accent rounded-lg transition-colors font-medium text-muted-foreground hover:text-foreground"
                        >
                            Security & Data
                        </Link>
                        <Link
                            href="#features"
                            className="block p-2 hover:bg-accent rounded-lg transition-colors font-medium text-muted-foreground hover:text-foreground"
                        >
                            Features & Integrations
                        </Link>
                        <Link
                            href="#misc"
                            className="block p-2 hover:bg-accent rounded-lg transition-colors font-medium text-muted-foreground hover:text-foreground"
                        >
                            Misc
                        </Link>
                    </nav>
                </aside>

                {/* FAQ Content */}
                <div className="md:w-3/4 space-y-16">
                    <section id="about" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold mb-6">About the Platform</h2>
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-lg font-semibold mb-2">
                                    What is this platform?
                                </h3>
                                <p className="text-muted-foreground">
                                    It is a solution designed to facilitate the management of your
                                    online processes, automate your key tasks, and improve
                                    communication with your users.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">
                                    What makes our solution unique?
                                </h3>
                                <p className="text-muted-foreground">
                                    Our platform stands out for its ease of use, optimized
                                    performance, and features adapted to the real needs of
                                    today&apos;s users.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section id="pricing" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold mb-6">Pricing & Plans</h2>
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-lg font-semibold mb-2">
                                    Is there a free version?
                                </h3>
                                <p className="text-muted-foreground">
                                    Yes, we offer a free plan with basic features to allow you to
                                    start immediately. Advanced plans are available to access
                                    additional tools.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">
                                    Why do prices vary by plan?
                                </h3>
                                <p className="text-muted-foreground">
                                    Each plan includes different features and levels of support,
                                    tailored to specific needs (personal, professional, or
                                    enterprise).
                                </p>
                            </div>
                        </div>
                    </section>

                    <section id="support" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold mb-6">Support & Assistance</h2>
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-lg font-semibold mb-2">
                                    Is support free?
                                </h3>
                                <p className="text-muted-foreground">
                                    Basic support is included for free. Premium support options may
                                    be available depending on your plan.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">
                                    How to get immediate assistance?
                                </h3>
                                <p className="text-muted-foreground">
                                    You can contact our team via the contact form on the site or
                                    directly by email for a quick response.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section id="security" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold mb-6">Security & Data</h2>
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-lg font-semibold mb-2">
                                    Are my data secure?
                                </h3>
                                <p className="text-muted-foreground">
                                    Yes, we use modern security protocols to protect your personal
                                    information and data.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">
                                    What happens in case of a leak or outage?
                                </h3>
                                <p className="text-muted-foreground">
                                    A continuity plan and regular backups are in place to reduce
                                    the impact of potential incidents.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section id="features" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold mb-6">
                            Features & Integrations
                        </h2>
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-lg font-semibold mb-2">
                                    Can I integrate other tools or services?
                                </h3>
                                <p className="text-muted-foreground">
                                    Yes, our platform supports numerous integrations with external
                                    tools to optimize your workflows.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">
                                    Can I update my account without losing my data?
                                </h3>
                                <p className="text-muted-foreground">
                                    Yes, any update to your account or information is done without
                                    interruption or loss of content.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section id="misc" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold mb-6">Misc</h2>
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-lg font-semibold mb-2">
                                    What if I forget my password?
                                </h3>
                                <p className="text-muted-foreground">
                                    You can use the password recovery feature via email to reset
                                    your password easily.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">
                                    Is there a roadmap of future features?
                                </h3>
                                <p className="text-muted-foreground">
                                    Yes, we regularly publish our updates and announcements to keep
                                    you informed of upcoming improvements.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">
                                    Do you have an automatic backup system?
                                </h3>
                                <p className="text-muted-foreground">
                                    Yes, regular backups are performed to guarantee that your data
                                    remains available and protected.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
