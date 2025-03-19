import type { Route } from "../+types/home";
import { useParams, useLocation } from "react-router-dom";
import { useState } from 'react';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "A Tarot Pull • Subtle Cards" },
    { name: "description", content: "A spread of virtual tarot cards" },
  ];
}

export default function PullById() {
  const [loading, setLoading] = useState(true);
  const [pullData, setPullData] = useState({empty: "true"});
  let id = useParams().id;
  const location = useLocation();
  if (location.state && loading) {
    setPullData(location.state.pullData);
    setLoading(false);
  }

  let pullString = JSON.stringify(pullData);

  return (
    <>
      <p>
        Here is the pull of {id}
      </p>
      <p>
        {pullString}
      </p>
    </>
  );
}