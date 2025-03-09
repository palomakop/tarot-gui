import { Link } from "react-router";
import { Footer } from "../footer";

export function Splash() {
  return (
    <main className="flex flex-col items-center justify-center p-4 pb-16 gap-9 min-h-[100vh]">
        <header>
          <h1 className="text-5xl">Subtle Cards</h1>
        </header>
        <div className="flex flex-col items-center justify-center pb-16 gap-9">
          <Link to="/pull/new">
            <button>
              Start a Pull
            </button>
          </Link>
        </div>
    <Footer />
    </main>
  );
}
