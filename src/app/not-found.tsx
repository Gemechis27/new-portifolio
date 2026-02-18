"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Oops! Page not found.</p>
      <Link
        href="/" // go to homepage
        className="px-6 py-3 bg-amber-400 text-white rounded-lg hover:bg-amber-500 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
