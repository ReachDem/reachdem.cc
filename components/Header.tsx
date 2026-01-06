import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-foreground">
              ReachDem
            </Link>
          </div>
          <nav className="flex gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-foreground dark:text-zinc-400 dark:hover:text-foreground"
            >
              Home
            </Link>
            <Link
              href="/faq"
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-foreground dark:text-zinc-400 dark:hover:text-foreground"
            >
              FAQ
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
