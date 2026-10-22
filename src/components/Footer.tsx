import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-8 text-center sm:flex-row sm:px-6 sm:text-left">
        <div className="flex items-center gap-2">
          <Dumbbell className="h-5 w-5 text-accent" />
          <span className="font-display text-lg font-bold">FITLOG</span>
        </div>
        <p className="text-xs text-gray-500">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}