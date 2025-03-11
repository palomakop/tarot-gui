import type { Route } from "./+types/home";
import { Link, Outlet } from "react-router";
import { Footer } from "../components/footer"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "A Tarot Pull on Subtle Cards" },
    { name: "description", content: "Pull a spread of virtual tarot cards" },
  ];
}

export default function Pull() {
  return (
    <div id="pull" className="p-4 flex flex-col justify-center items-center gap-9 mh-[100vh]">
      <Outlet />
      <Footer />
    </div>
  );
}