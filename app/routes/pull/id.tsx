import type { Route } from "../+types/home";
import { useParams } from "react-router-dom";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "A Tarot Pull • Subtle Cards" },
    { name: "description", content: "A spread of virtual tarot cards" },
  ];
}

export default function PullById() {
  let id = useParams().id;
  return (
    <p>
      Here is the pull of {id}
    </p>
  );
}