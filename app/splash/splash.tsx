import { Link } from "react-router";

export function Splash() {
  return (
    <main className="flex flex-col items-center justify-center pt-16 pb-16 gap-9 min-h-[100vh]">
        <header>
          <h1 className="text-5xl">Subtle Cards</h1>
        </header>
        <div className="flex flex-col items-center justify-center pb-30 gap-9">
          <Link to="/pull/new">
            <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full">
              Start a Pull
            </button>
          </Link>
          <p><a href="/about">About</a></p>
        </div>
    </main>
  );
}
