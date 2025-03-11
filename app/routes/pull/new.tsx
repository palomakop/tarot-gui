import type { Route } from "../+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New Tarot Pull • Subtle Cards" },
    { name: "description", content: "A spread of virtual tarot cards" },
  ];
}

export default function NewPull() {
  return (
    <p>
      A form to create your pull
    </p>
  );
}