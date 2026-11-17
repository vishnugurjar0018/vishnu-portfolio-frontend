
"use client";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#FCFAFF]">

      {/* Background Effects */}
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-purple-200/40 blur-[100px]" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-fuchsia-200/30 blur-[110px]" />

      {/* Main Loader */}
      <div className="relative z-10 flex flex-col items-center">

        {/* Loading Text */}
        <h2 className="text-2xl font-extrabold tracking-wide text-[#171321]">
          VK <span className="text-[#7900D8]">Creations</span>
        </h2>

        <p className="mt-3 text-sm font-medium tracking-wider text-gray-500">
          Creating Digital Experiences
        </p>

        {/* Animated Dots */}
        <div className="mt-8 flex items-center gap-2">
          <span className="h-3 w-3 animate-bounce rounded-full bg-[#7900D8]" />
          <span className="h-3 w-3 animate-bounce rounded-full bg-fuchsia-500 [animation-delay:150ms]" />
          <span className="h-3 w-3 animate-bounce rounded-full bg-purple-300 [animation-delay:300ms]" />
        </div>

        {/* Progress Bar */}
        <div className="mt-9 h-1.5 w-48 overflow-hidden rounded-full bg-purple-100">
          <div className="h-full w-1/2 animate-[loading_1.5s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-[#7900D8] to-fuchsia-500" />
        </div>

        <p className="mt-4 text-xs font-medium tracking-[2px] text-gray-400">
          PLEASE WAIT...
        </p>
      </div>

      {/* Bottom Branding */}
      <div className="absolute bottom-8 text-center">
        <p className="text-xs text-gray-400">
          Designed & Developed with{" "}
          <span className="text-[#7900D8]">♥</span>
          {" "}by Vishnu Gurjar
        </p>
      </div>

      {/* Custom Animation */}
      <style jsx>{`
        @keyframes loading {
          0% {
            transform: translateX(-110%);
          }
          50% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(220%);
          }
        }
      `}</style>

    </div>
  );
}
