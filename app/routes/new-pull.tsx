import type { Route } from "./+types/home";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New Tarot Pull • Subtle Cards" },
    { name: "description", content: "Pull a spread of virtual tarot cards" },
  ];
}

export default function About() {
  return (
    <div id="about" className="">
      new pull page
    </div>
  );
}