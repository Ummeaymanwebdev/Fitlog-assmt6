"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  const onMyPlan = pathname === "/my-plan";
  const onWorkouts = pathname === "/" || pathname.startsWith("/workouts");

  const activeStyle = "bg-[#ccff00]/15 text-[#ccff00]";
  const normalStyle = "text-gray-400 hover:text-white";

  return (
    <header className="sticky top-0 z-40 border-b border-[#23262f] bg-[#0a0b0f]">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="FitLog logo" className="h-8 w-8" />
          <span className="heading hidden text-xl sm:inline">FitLog</span>
        </Link>
        <div className="flex gap-2 text-sm">
          <Link
            href="/"
            className={`rounded-full px-3 py-1.5 ${onWorkouts ? activeStyle : normalStyle}`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`rounded-full px-3 py-1.5 ${onMyPlan ? activeStyle : normalStyle}`}
          >
            My Plan
          </Link>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <Link href="/my-plan" className="flex items-center gap-2">
            <span className="hidden sm:inline">Plan</span>
            <span className="grid h-6 min-w-6 place-items-center rounded-full bg-[#ccff00] px-1 text-xs font-bold text-black">
              {plan.length}
            </span>
          </Link>
          <Link href="/my-plan" className="flex items-center gap-2">
            <span className="hidden sm:inline">Saved</span>
            <span className="grid h-6 min-w-6 place-items-center rounded-full border border-gray-500 px-1 text-xs">
              {saved.length}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}