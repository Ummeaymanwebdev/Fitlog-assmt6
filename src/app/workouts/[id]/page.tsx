"use client";
import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import { toast } from "react-toastify";
import { getWorkout } from "@/data/api";
import { usePlan } from "@/context/PlanContext";
import type { Workout } from "@/types/workout";

export default function WorkoutDetails() {
  const { id } = useParams<{ id: string }>();
  const { plan, addToPlan, saveForLater } = usePlan();

  const [w, setW] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getWorkout(id)
      .then((data) => setW(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <p className="animate-pulse py-20 text-center text-gray-400">
        Loading...
      </p>
    );
  }
  if (error || !w) notFound();

  function handleAdd() {
    const result = addToPlan(w!);
    if (result === "added") toast.success("Added to today's plan");
    if (result === "exists") toast.info("Already in today's plan");
    if (result === "full") toast.warn("Plan is full (max 5 lifts)");
  }

  function handleSave() {
    const result = saveForLater(w!);
    if (result === "added") toast.success("Saved for later");
    else toast.info("Already saved");
  }

  const specs = [
    ["Equipment", w.equipment],
    ["Difficulty", w.difficulty],
    ["Sets", w.sets],
    ["Reps", w.reps],
    ["Duration", `${w.duration} min`],
    ["Calories", `${w.calories} kcal`],
    ["Rating", w.rating],
  ];


  const cannotAdd = plan.some((x) => x.id === w.id) || plan.length >= 5;

  return (
    <div className="py-10">
      <div className="grid gap-8 lg:grid-cols-2">
       
        <div className="card overflow-hidden">
          <img
            src={w.image}
            alt={w.title}
            className="h-full max-h-[560px] w-full object-cover"
          />
        </div>

        <div>
          <h1 className="heading text-4xl sm:text-5xl">{w.title}</h1>
          <p className="mt-3 text-gray-400">{w.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {w.tags.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>

          <div className="card mt-6">
            <h2 className="heading border-b border-[#23262f] px-5 py-3 text-sm tracking-widest text-[#ccff00]">
              Key Specs
            </h2>
            {specs.map(([label, value]) => (
              <div
                key={label}
                className="flex justify-between border-b border-[#23262f] px-5 py-3 text-sm last:border-0"
              >
                <span className="uppercase text-gray-500">{label}</span>
                <span>{value}</span>
              </div>
            ))}
          </div>

          <h2 className="heading mt-8 text-xl">Instructions</h2>
          <ol className="mt-3 space-y-3">
            {w.instructions.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm text-gray-300">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#ccff00] text-xs font-bold text-black">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button onClick={handleAdd} disabled={cannotAdd} className="btn-main">
              + Add to today&apos;s plan
            </button>
            <button onClick={handleSave} className="btn-line">
              Save for later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}