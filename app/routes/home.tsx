import type { Route } from "./+types/home";
import { Splash } from "../splash/splash";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Subtle Cards" },
    { name: "description", content: "Pull a spread of Tarot cards online" },
  ];
}

export function loader({ context }: Route.LoaderArgs) {
  return { message: context.VALUE_FROM_NETLIFY };
}

export default function Home() {
  return <Splash />;
}
