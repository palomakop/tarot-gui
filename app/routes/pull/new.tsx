import type { Route } from "../+types/home";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from "axios";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New Tarot Pull • Subtle Cards" },
    { name: "description", content: "A spread of virtual tarot cards" },
  ];
}

function formDataToObject(formData: FormData): Record<string, FormDataEntryValue> {
  const data: Record<string, FormDataEntryValue> = {};
  for (let [key, value] of formData.entries()) {
    data[key] = value;
  }
  return data;
}

function buildPullData(formData: FormData) {
  let body = {
    spreadType: "",
    numberOfCards: 0,
    deck: "Rider-Waite-Smith",
    allowReversed: false,
    intention: ""
  };
  let data = formDataToObject(formData);
  body.spreadType = data.layout as string;
  body.intention = data.Intention as string;
  switch(data.layout) {
    case "Single": {
      body.numberOfCards = 1;
      break;
    }
    case "Triple": {
      body.numberOfCards = 3;
      break;
    }
    case "Cross": {
      body.numberOfCards = 6;
      break;
    }
  }
  if ('AllowReversed' in data) {
    body.allowReversed = true;
  }
  return body;
}



export default function NewPull() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setTimeout(async () => {
      let body = buildPullData(formData);
      console.log(JSON.stringify(body));
      let newPullId = 'dummyId';
      const delay = new Promise((resolve) => setTimeout(resolve, 3000));
      const apiCall = axios.post("https://subtle-cards-api-125ec9e25dbd.herokuapp.com/pull/new", body);
      try {
        const [apiResponse] = await Promise.all([apiCall, delay]);
        console.log(JSON.stringify(apiResponse));
        newPullId = apiResponse.data.message.id;
        console.log(newPullId);
      } catch (err) {
        console.log("Something went wrong with the API call");
      } finally {
        navigate(`/pull/${newPullId}`);
      }
  }, 3000);
  }

  if (loading) {
    return <p>loading</p>;
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
        <button type="submit" disabled={loading}>Pull Cards</button>
      </form>
      {loading && <p>Loading...</p>}
    </div>
  );

}