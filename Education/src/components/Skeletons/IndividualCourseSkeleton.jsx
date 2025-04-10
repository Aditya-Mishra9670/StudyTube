import { Star, StarHalf, Users, AlertTriangle } from "lucide-react";

export default function CourseSkeleton() {
  return (
    <main className="pt-[69px] bg-base-100 min-h-screen flex flex-col items-center">
      <section className="w-full h-72 bg-contain bg-center relative bg-gray-300 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-base-100" />
      </section>
      <article className="w-full max-w-5xl bg-base-200 shadow-lg rounded-lg p-8 -mt-16 z-10">
        <header className="flex items-center gap-6 mb-6">
          <div className="avatar w-24 h-24 rounded-full ring-4 ring-primary overflow-hidden bg-gray-300 animate-pulse" />
          <div className="w-32 h-6 bg-gray-300 animate-pulse" />
        </header>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index}>
              <div className="w-24 h-5 bg-gray-300 animate-pulse mb-2" />
              <div className="w-16 h-5 bg-gray-300 animate-pulse" />
            </div>
          ))}
          <div>
            <div className="w-24 h-5 bg-gray-300 animate-pulse mb-2" />
            <div className="w-32 h-5 bg-gray-300 animate-pulse" />
          </div>
        </section>
        <section>
          <div className="w-64 h-8 bg-gray-300 animate-pulse mb-4" />
          <div className="w-40 h-5 bg-gray-300 animate-pulse flex items-center my-2" />
          <div className="w-full h-24 bg-gray-300 animate-pulse" />
        </section>
      </article>
      <footer className="w-full max-w-5xl flex flex-col sm:flex-row justify-center gap-4 mt-8 p-4">
        <div className="w-32 h-10 bg-gray-300 animate-pulse rounded" />
        <div className="w-32 h-10 bg-gray-300 animate-pulse rounded" />
      </footer>
    </main>
  );
}