import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid place-items-center py-32 text-center">
      <p className="font-display text-8xl font-bold text-accent">404</p>
      <h1 className="mt-2 font-display text-3xl uppercase">Page not found</h1>
      <p className="mt-2 text-gray-400">
        This lift doesn&apos;t exist. Let&apos;s get you back to training.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-md bg-accent px-6 py-3 text-sm font-bold text-black hover:brightness-90"
      >
        Back to home
      </Link>
    </div>
  );
}