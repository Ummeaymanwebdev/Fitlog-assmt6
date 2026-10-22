import type { Workout } from "@/types/workout";

const URL = "https://api.abcz.workers.dev/api/fitlog";

function fix(w: any): Workout {
  return {
    id: String(w.id),
    title: w.title ?? w.name ?? "",
    description: w.description ?? "",
    image: w.image ?? w.thumbnail ?? "",
    tags: w.tags ?? w.categories ?? [],
    equipment: w.equipment ?? "",
    difficulty: w.difficulty ?? "-",
    sets: w.sets ?? "-",
    reps: w.reps ?? "-",
    duration: parseInt(String(w.duration)) || 0,
    calories: parseInt(String(w.calories)) || 0,
    rating: w.rating ?? 0,
    instructions: w.instructions ?? [],
  };
}

export async function getWorkouts(): Promise<Workout[]> {
  const res = await fetch(URL);
  if (!res.ok) throw new Error("Failed");
  const json = await res.json();
  const list = Array.isArray(json) ? json : json.data ?? [];
  return list.map(fix);
}

export async function getWorkout(id: string): Promise<Workout> {
  const res = await fetch(`${URL}/${id}`);
  if (!res.ok) throw new Error("Not found");
  const json = await res.json();
  return fix(json.data ?? json);
}