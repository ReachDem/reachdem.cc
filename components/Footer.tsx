import Link from 'next/link';
import Image from 'next/image';
import { Github, Linkedin } from 'lucide-react';
import { FaXTwitter } from 'react-icons/fa6';
import { Button } from './ui/button';

const navigation = [
	{
		title: 'Product',
		links: [
			{ name: 'Features', href: '/#features' },
			{ name: 'Pricing', href: '/pricing' },
			{ name: 'Use Cases', href: '/use-cases' },
			{ name: 'FAQ', href: '/faq' },
		],
	},
	{
		title: 'Company',
		links: [
			{ name: 'About', href: '/about' },
			{ name: 'Blog', href: '/blog' },
			{ name: 'Contact', href: '/contact' },
			{ name: 'Careers', href: '/careers' },
		],
	},
	{
		title: 'Legal',
		links: [
			{ name: 'Terms of Service', href: '/legal/terms' },
			{ name: 'Privacy Policy', href: '/legal/privacy' },
			{ name: 'Cookie Policy', href: '/legal/cookie' },
			{ name: 'Security', href: '/legal/compliance' },
		],
	},
];


const socialLinks = [
	{ icon: FaXTwitter, href: 'https://x.com' },
	{ icon: Github, href: 'https://github.com' },
	{ icon: Linkedin, href: 'https://linkedin.com' },
];

export function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-primary text-primary-foreground">
			<div className='bg-primary'>
				{/* CTA Section */}
				<div className="border-sand-600 mx-auto flex max-w-[80vw] flex-col items-center border-b py-10 text-center md:py-14 lg:py-20">
					<h2 className="max-w-[800px] text-5xl leading-none font-semibold tracking-tight text-balance lg:text-6xl">
						Reach Them, Convert <br />
						<span className="text-sand-600">Without complexity.</span>
					</h2>
          <Button asChild variant="secondary" size="lg" className="mt-9">
            <Link href="/get-started">Get started for free</Link>
          </Button>
				</div>

				{/* Navigation Section */}
				<nav className="border-sand-600/50 mx-auto max-w-[80vw] border-b py-6">
					<div className="container flex flex-wrap gap-x-32 gap-y-12 md:justify-between md:gap-y-16 lg:gap-y-24">
						{navigation.map((section) => (
							<div key={section.title}>
								<h3 className="mb-6 font-medium lg:text-lg">{section.title}</h3>
								<ul className="space-y-4">
									{section.links.map((link) => (
										<li key={link.name}>
											<Link
												href={link.href}
												className="hover:text-muted-foreground transition-colors lg:text-lg"
											>
												{link.name}
											</Link>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</nav>

				{/* Bottom Section */}
				<div className="container mx-auto max-w-[80vw] py-8">
					<div className="flex flex-wrap items-center justify-between gap-6">
						<div className="flex items-center gap-3">
							<Link href="/" className="flex items-center gap-2">
								<div className="relative h-6 w-6">
									<Image
										src="/Black.png"
										alt="ReachDem Logo"
										fill
										className="object-contain dark:hidden"
									/>
									<Image
										src="/White Variant.png"
										alt="ReachDem Logo"
										fill
										className="object-contain hidden dark:block"
									/>
								</div>
								<span className="font-semibold">ReachDem</span>
							</Link>
							<span>
								© {currentYear} ReachDem. All rights reserved.
							</span>
						</div>
						<div className="flex items-center gap-6">
							{socialLinks.map((link) => (
								<Link
									aria-label={link.href}
									key={link.href}
									href={link.href}
									className="hover:text-muted-foreground transition-colors"
									target="_blank"
									rel="noopener noreferrer"
								>
									<link.icon size={20} />
								</Link>
							))}
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
