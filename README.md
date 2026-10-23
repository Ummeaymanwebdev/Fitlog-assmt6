# FitLog — Workout Library

FitLog is a dark, no-nonsense gym companion. Browse a library of lifts, lock your favourites into today's plan, save others for later, and watch your daily workout totals add up.

Live Demo: (https://fitlog-assmt6.vercel.app/)
GitHub: https://github.com/Ummeaymanwebdev/Fitlog-assmt6

## Technologies Used

- Next.js (App Router) for pages and routing
- React and TypeScript for the UI
- Tailwind CSS for styling and responsive design
- React Toastify for toast notifications
- Lucide React for icons

## Key Features

1. Workout Library: all workouts from the API shown as cards in a responsive grid (3 columns on large screens) with a loading animation while data is fetched.
2. Sort Dropdown: re-sort the library by Duration, Calories or Rating.
3. Workout Details: a two-column page with image, key specs and step-by-step instructions.
4. Today's Plan and Saved: add workouts to today's plan (maximum five) or save them for later, with live Plan and Saved counters in the navbar.
5. My Plan Page: live totals for exercises, minutes and calories, tabs for Plan and Saved, mark as done and remove actions, plus a friendly empty state.
6. Toast Notifications: instant feedback for every add, save, remove and done action.
7. Persistent Data: your plan and saved lists stay after a page reload (localStorage).
8. Fully Responsive with a custom 404 page.

## Getting Started

```bash
git clone https://github.com/Ummeaymanwebdev/Fitlog-assmt6.git
cd Fitlog-assmt6
npm install
npm run dev
```

## Pages

| Route | Description |
|---|---|
| `/` | Home with hero and workout library |
| `/workouts/[id]` | Workout details |
| `/my-plan` | Today's plan and saved workouts |
