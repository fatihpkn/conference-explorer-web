import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b w-full">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          Conference Explorer
        </Link>
        <nav className="flex gap-4">
          <Link
            href="/conferences"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            Conferences
          </Link>
        </nav>
      </div>
    </header>
  );
}
