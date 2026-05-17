import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-white px-6">
      {/* Decorative wave bottom */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 220" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            fill="#dbeafe"
            fillOpacity="0.6"
            d="M0,160 C360,220 1080,80 1440,160 L1440,220 L0,220 Z"
          />
          <path
            fill="#bfdbfe"
            fillOpacity="0.4"
            d="M0,180 C480,120 960,200 1440,180 L1440,220 L0,220 Z"
          />
        </svg>
      </div>

      {/* Floating clouds */}
      <div className="pointer-events-none absolute left-[8%] top-[12%] h-8 w-24 rounded-full bg-blue-100 opacity-70" />
      <div className="pointer-events-none absolute left-[14%] top-[18%] h-5 w-16 rounded-full bg-blue-100 opacity-50" />
      <div className="pointer-events-none absolute right-[10%] top-[8%] h-6 w-20 rounded-full bg-blue-100 opacity-60" />
      <div className="pointer-events-none absolute right-[16%] top-[14%] h-4 w-14 rounded-full bg-blue-100 opacity-40" />

      {/* Swirl decorations */}
      <svg className="pointer-events-none absolute bottom-[22%] left-[18%] h-8 w-8 text-blue-200" viewBox="0 0 40 40" fill="none">
        <path d="M20 5 C10 5 5 12 8 20 C11 28 20 30 26 24 C32 18 28 10 20 10 C14 10 12 16 16 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      </svg>
      <svg className="pointer-events-none absolute bottom-[18%] right-[12%] h-10 w-10 text-blue-200" viewBox="0 0 40 40" fill="none">
        <path d="M20 5 C10 5 5 12 8 20 C11 28 20 30 26 24 C32 18 28 10 20 10 C14 10 12 16 16 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      </svg>
      <svg className="pointer-events-none absolute bottom-[30%] left-[38%] h-7 w-7 text-blue-200" viewBox="0 0 40 40" fill="none">
        <path d="M20 5 C10 5 5 12 8 20 C11 28 20 30 26 24 C32 18 28 10 20 10 C14 10 12 16 16 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      </svg>

      {/* Main content */}
      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center gap-8 md:flex-row md:items-center md:justify-between">
        {/* Left: Text */}
        <div className="flex flex-col items-start gap-4 text-left">
          {/* 404 */}
          <h1
            className="select-none text-[9rem] font-extrabold leading-none tracking-tight md:text-[11rem]"
            style={{
              color: "#60a5fa",
              textShadow: "0 8px 24px rgba(96,165,250,0.25), 0 2px 0 #93c5fd",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            404
          </h1>

          {/* Title */}
          <h2 className="text-xl font-bold uppercase tracking-widest text-slate-700 md:text-2xl">
            OOPSY... PAGE NOT FOUND
          </h2>

          {/* Description */}
          <p className="max-w-xs text-sm text-slate-500">
            We suggest you go to homepage while we fixing the problem 🥺
          </p>

          {/* Button */}
          <Link
            href="/"
            className="mt-2 rounded-full bg-blue-400 px-8 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-500 active:scale-95"
          >
            Go to Homepage
          </Link>
        </div>

        {/* Right: Mascot */}
        <div className="relative flex flex-col items-center">
          {/* Thought bubble — nempel di atas kanan mascot */}
          <div className="absolute top-[90px] right-[80px] z-10">
            <div className="relative rounded-2xl border border-blue-100 bg-blue-50 px-5 py-2 text-sm text-blue-400 shadow-sm">
              ...where am I?
              <span className="absolute -bottom-2 left-6 h-2 w-2 rounded-full bg-blue-100" />
              <span className="absolute -bottom-4 left-4 h-1.5 w-1.5 rounded-full bg-blue-100" />
            </div>
          </div>

          {/* X marks */}
          <div className="pointer-events-none absolute right-4 top-8 text-blue-300 text-lg font-bold">✕</div>
          <div className="pointer-events-none absolute right-10 top-14 text-blue-200 text-sm font-bold">✕</div>

          {/* Mascot image */}
          <Image
            src="/images/error-page-img/mascot.png"
            alt="Lost washing machine mascot"
            width={620}
            height={520}
            className="drop-shadow-xl"
            priority
          />
        </div>
      </div>
    </main>
  );
}
