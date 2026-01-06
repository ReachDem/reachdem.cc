export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center text-sm text-zinc-600 dark:text-zinc-400">
          <p>&copy; {new Date().getFullYear()} ReachDem. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
