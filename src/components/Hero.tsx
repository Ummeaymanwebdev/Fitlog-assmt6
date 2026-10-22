export default function Hero() {
  return (
    <section className="card mt-8 px-6 py-10 sm:px-10 md:py-14">
      <div className="grid items-center gap-10 md:grid-cols-2">
        
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#ccff00]">
            Workout Library
          </p>
          <h1 className="heading mt-4 text-5xl leading-none sm:text-6xl lg:text-7xl">
            Train with intent. Log every set.
          </h1>
          <p className="mt-5 max-w-md text-gray-400">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <a href="#library" className="btn-main mt-7 uppercase">
            Browse Workouts ↓
          </a>
        </div>

        <div className="flex justify-center">
          <img
            src="/banner.png"
            alt="Hero banner"
            className="max-h-80 w-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
}