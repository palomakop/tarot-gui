import type { Route } from "./+types/home";
import { Outlet } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "A Tarot Pull on Subtle Cards" },
    { name: "description", content: "Pull a spread of virtual tarot cards" },
  ];
}

export default function Pull() {
  return <Outlet />;
}