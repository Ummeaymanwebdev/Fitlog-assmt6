"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";
import { getWorkouts } from "@/data/api";
import type { Workout } from "@/types/workout";

export default function Library() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sortBy, setSortBy] = useState("duration");

  useEffect(() => {
    getWorkouts()
      .then((data) => setWorkouts(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  
  const sorted = [...workouts].sort((a, b) => {
    if (sortBy === "duration") return a.duration - b.duration;
    if (sortBy === "calories") return b.calories - a.calories;
    return Number(b.rating) - Number(a.rating);
  });

  return (
    <section id="library" className="scroll-mt-20 py-12">
      
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="heading text-3xl">The Library</h2>
          <p className="mt-1 text-sm text-gray-400">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-md border border-[#23262f] bg-[#12141b] px-3 py-2 text-sm"
        >
          <option value="duration">Sort By: Duration</option>
          <option value="calories">Sort By: Calories</option>
          <option value="rating">Sort By: Rating</option>
        </select>
      </div>

      {loading && (
        <p className="animate-pulse py-20 text-center text-gray-400">
          Loading workouts...
        </p>
      )}

      {error && (
        <p className="py-20 text-center text-red-400">
          Something went wrong. Please try again.
        </p>
      )}

      {!loading && !error && (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((w) => (
            <Link
              key={w.id}
              href={`/workouts/${w.id}`}
              className="card overflow-hidden transition hover:border-[#ccff00]"
            >
              <img
                src={w.image}
                alt={w.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-5">
                
                <div className="flex flex-wrap gap-2">
                  {w.tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>

                <h3 className="heading mt-4 text-xl">{w.title}</h3>
                <p className="mt-1 text-xs text-gray-500">{w.equipment}</p>

                <div className="mt-4 flex gap-4 border-t border-[#23262f] pt-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock size={14} /> {w.duration} min
                  </span>
                  <span className="flex items-center gap-1">
                    <Flame size={14} /> {w.calories} kcal
                  </span>
                  <span className="flex items-center gap-1">
                    <Star size={14} /> {w.rating}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}