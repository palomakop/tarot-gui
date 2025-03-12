import type { Route } from "../+types/home";
import axios from 'axios';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New Tarot Pull • Subtle Cards" },
    { name: "description", content: "A spread of virtual tarot cards" },
  ];
}

export default function NewPull() {

  function handleSubmit(data: FormData): void {
    console.log("Form submitted");
  }

  return (
    <div className="flex flex-col items-center justify-center p-2 sm:p-4 gap-6 w-[500px] max-w-full ml-auto mr-auto">
      <h1>
        New Tarot Pull
      </h1>
      <form action={handleSubmit}>
        <p>Choose a card layout:</p>
        <div className="radio">
          <input type="radio" name="layout" value="Single" defaultChecked />
          <label htmlFor="Single">Single</label>
        </div>
        <div className="radio">
          <input type="radio" name="layout" value="Triple" />
          <label htmlFor="css">Triple</label>
        </div>
        <div className="radio">
          <input type="radio" name="layout" value="Cross" />
          <label htmlFor="Cross">Cross</label>
        </div>
        <p className="checkbox">
          <input type="checkbox" name="AllowReversed" value="AllowReversed" defaultChecked />
          <label htmlFor="AllowReversed">Allow reversed cards?</label>
        </p>
        <p>
          <label htmlFor="Intention">Briefly set an intention:</label>
        </p>
        <input type="text" maxLength={50} name="Intention" placeholder="Optional" />
        <button type="submit">Pull Cards</button>
      </form>
    </div>
  );
}