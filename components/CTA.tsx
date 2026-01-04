import Link from "next/link";

export function CTA() {
    return (
        <section className="bg-black py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                        Streamline starts now. <br />
                        <span className="text-gray-400">Your future won't wait.</span>
                    </h2>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            href="/signup"
                            className="rounded-lg bg-white px-8 py-3.5 text-base font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                            Get started with 7 days free
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
