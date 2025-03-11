import type { Route } from "../+types/home";
import { NewPullForm } from "../../components/newPullForm"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New Tarot Pull • Subtle Cards" },
    { name: "description", content: "A spread of virtual tarot cards" },
  ];
}

export default function NewPull() {
  return (
    <NewPullForm />
  );
}