"use client";
import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { usePlan } from "@/context/PlanContext";
import type { Workout } from "@/types/workout";

export default function MyPlan() {
  const [tab, setTab] = useState("plan");
  const { plan, saved, done, loaded, removeFromPlan, removeSaved, markDone } =
    usePlan();

  const totalMinutes = plan.reduce((sum, w) => sum + w.duration, 0);
  const totalCalories = plan.reduce((sum, w) => sum + w.calories, 0);

  const list = tab === "plan" ? plan : saved;

  function handleRemove(w: Workout) {
    if (tab === "plan") removeFromPlan(w.id);
    else removeSaved(w.id);
    toast.error("Removed from list");
  }

  function handleDone(w: Workout) {
    markDone(w.id);
    toast.success("Marked as done");
  }

  const activeTab = "bg-[#ccff00] text-black";
  const normalTab = "text-gray-400 hover:text-white";

  return (
    <div className="py-10">
      <h1 className="heading text-4xl">My Plan</h1>
      <p className="mt-1 text-sm text-gray-400">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="card p-5">
          <p className="text-xs uppercase text-gray-500">Exercises</p>
          <p className="heading mt-2 text-4xl text-[#ccff00]">{plan.length}</p>
        </div>
        <div className="card p-5">
          <p className="text-xs uppercase text-gray-500">Minutes</p>
          <p className="heading mt-2 text-4xl text-[#ccff00]">{totalMinutes}</p>
        </div>
        <div className="card p-5">
          <p className="text-xs uppercase text-gray-500">Calories</p>
          <p className="heading mt-2 text-4xl text-[#ccff00]">{totalCalories}</p>
        </div>
      </div>

      <div className="card mt-8 inline-flex gap-1 p-1">
        <button
          onClick={() => setTab("plan")}
          className={`rounded-md px-5 py-2 text-sm font-semibold ${
            tab === "plan" ? activeTab : normalTab
          }`}
        >
          Today&apos;s Plan
        </button>
        <button
          onClick={() => setTab("saved")}
          className={`rounded-md px-5 py-2 text-sm font-semibold ${
            tab === "saved" ? activeTab : normalTab
          }`}
        >
          Saved
        </button>
      </div>

      {!loaded ? (
        <p className="animate-pulse py-16 text-center text-gray-400">
          Loading workouts…
        </p>
      ) : list.length === 0 ? (
        <div className="card mt-8 py-16 text-center">
          <h2 className="heading text-2xl">Nothing here yet</h2>
          <p className="mt-2 text-sm text-gray-400">
            Browse the library and add a lift to get today moving.
          </p>
          <Link href="/" className="btn-main mt-6">
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {list.map((w) => {
            const isDone = done.includes(w.id);
            return (
              <div
                key={w.id}
                className="card flex flex-col gap-4 p-4 md:flex-row md:items-center"
              >
                <img
                  src={w.image}
                  alt={w.title}
                  className="h-40 w-full rounded-lg object-cover md:h-20 md:w-28"
                />

                <div className="flex-1">
                  <h3
                    className={`heading text-lg ${
                      isDone ? "text-gray-500 line-through" : ""
                    }`}
                  >
                    {w.title}
                  </h3>
                  <p className="text-xs text-gray-500">{w.equipment}</p>
                  <p className="mt-2 text-xs text-gray-400">
                    {w.duration} min · {w.calories} kcal · ★ {w.rating}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href={`/workouts/${w.id}`}
                    className="btn-line !px-4 !py-2 text-sm"
                  >
                    View Details
                  </Link>

                  {tab === "plan" && (
                    <button
                      onClick={() => handleDone(w)}
                      disabled={isDone}
                      className="btn-main !px-4 !py-2 text-sm"
                    >
                      ✓ {isDone ? "Done" : "Mark as Done"}
                    </button>
                  )}

                  <button
                    onClick={() => handleRemove(w)}
                    className="btn-line !px-3 !py-2 text-sm"
                  >
                    ✕
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}