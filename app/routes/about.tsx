import type { Route } from "./+types/home";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About Subtle Cards" },
    { name: "description", content: "Pull a spread of Tarot cards online" },
  ];
}

export default function About() {
  return (
    <div id="about" className="flex flex-col items-center justify-center pt-4 pb-16 gap-9 min-h-[100vh] w-[500px] max-w-[100vw] ml-auto mr-auto">
      <h1>About</h1>
      <p>
        Subtle Cards is an app that allows you to pull a spread of tarot cards virtually on the web. To select the cards, it uses the <a href="https://random.org">Random.org</a> API which provides true random numbers based on atmospheric interference.
      </p>

      <h2>Who / Why / How</h2>
      <p>
        Subtle Cards was built by <a href="https://palomakop.tv">Paloma Kop</a> during a coding retreat at <a href="https://recurse.com">Recurse Center</a>. The front end is built with React and the back end is powered by a Flask API and Supabase.
      </p>
      <Link to="/">← Back to home</Link>
    </div>
  );
}