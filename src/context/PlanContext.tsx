"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { Workout } from "@/types/workout";

type PlanContextType = {
  plan: Workout[];
  saved: Workout[];
  done: string[];
  loaded: boolean;
  addToPlan: (w: Workout) => string;
  saveForLater: (w: Workout) => string;
  removeFromPlan: (id: string) => void;
  removeSaved: (id: string) => void;
  markDone: (id: string) => void;
};

const PlanContext = createContext<PlanContextType | null>(null);

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [done, setDone] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("fitlog") || "{}");
    setPlan(data.plan || []);
    setSaved(data.saved || []);
    setDone(data.done || []);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("fitlog", JSON.stringify({ plan, saved, done }));
    }
  }, [plan, saved, done, loaded]);

  function addToPlan(w: Workout) {
    if (plan.some((x) => x.id === w.id)) return "exists";
    if (plan.length >= 5) return "full";
    setPlan([...plan, w]);
    return "added";
  }

  function saveForLater(w: Workout) {
    if (saved.some((x) => x.id === w.id)) return "exists";
    setSaved([...saved, w]);
    return "added";
  }

  function removeFromPlan(id: string) {
    setPlan(plan.filter((x) => x.id !== id));
  }

  function removeSaved(id: string) {
    setSaved(saved.filter((x) => x.id !== id));
  }

  function markDone(id: string) {
    if (!done.includes(id)) setDone([...done, id]);
  }

  return (
    <PlanContext.Provider
      value={{
        plan, saved, done, loaded,
        addToPlan, saveForLater, removeFromPlan, removeSaved, markDone,
      }}
    >
      {children}
      <ToastContainer theme="dark" position="top-right" autoClose={2000} />
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used inside PlanProvider");
  return ctx;
}