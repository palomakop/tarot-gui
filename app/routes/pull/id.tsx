import type { Route } from "../+types/home";
import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from "react-router";
import { MoonPhase } from "../../components/moon";
import { Spread } from "../../components/spread";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "A Tarot Pull • Subtle Cards" },
    { name: "description", content: "A spread of virtual tarot cards" },
  ];
}

export default function PullById() {
  const [loading, setLoading] = useState(true);
  const [pullData, setPullData] = useState<any>(false);
  let id = useParams().id as String;
  const location = useLocation();

  useEffect(() => {
    if (location.state?.pullData) {
      setPullData(location.state.pullData);
      setLoading(false);
    } else {
      axios
        .get(`https://subtle-cards-api-125ec9e25dbd.herokuapp.com/pull/${id}`)
        .then((response) => {
          setPullData(response.data.message);
        })
        .catch((error) => {
          console.error("Error fetching pull data:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id, location.state]);

  if (loading) return <p>Loading...</p>;

  let timeCreated;
  let intention;

  if(pullData) {
    timeCreated = new Date(pullData.timestamp);
    intention = pullData.pullDetails.intention;
  }
  else {
    return (
      <>
        <h1>Hmmm...</h1>
        <p className="mb-10">We can't find this pull. Would you like to create a <Link to="/pull/new">new tarot pull</Link>?</p>
      </>
    )
  }

  return (
    <div className="flex flex-col gap-4 items-center my-4">
      <h1>
        A Tarot Pull
      </h1>
      {intention && <h2 className="text-center"><span className="text-stone-400 italic text-xl">Intention:</span><br />{intention}</h2>}
      <p className="text-stone-400 text-center">
        Pulled at {timeCreated.toLocaleTimeString("en-US", {hour: 'numeric', minute:'numeric'})} on {timeCreated.toLocaleDateString("en-US", {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}<br />
        (<MoonPhase date={timeCreated} /> moon)
      </p>
      <Spread spreadData={pullData} />
    </div>
  );
}