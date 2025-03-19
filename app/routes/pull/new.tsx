import type { Route } from "../+types/home";
import { useViewTransitionNavigate } from "../../components/useViewTransitionNavigate";
import { useState } from 'react';
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";


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
  const navigate = useViewTransitionNavigate();

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setTimeout(async () => {
      let body = buildPullData(formData);
      console.log(JSON.stringify(body));
      let newPullId = 'dummyId';
      let newPullData = {};
      const delay = new Promise((resolve) => setTimeout(resolve, 3000));
      const apiCall = axios.post("https://subtle-cards-api-125ec9e25dbd.herokuapp.com/pull/new", body);
      try {
        const [apiResponse] = await Promise.all([apiCall, delay]);
        console.log(JSON.stringify(apiResponse));
        newPullId = apiResponse.data.message.id;
        newPullData = apiResponse.data;
        console.log(newPullId);
      } catch (err) {
        console.log("Something went wrong with the API call");
      } finally {
        navigate(`/pull/${newPullId}`, {state: {pullData: newPullData}});
      }
  }, 3000);
  }

  return (
    <>
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
      </div>
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="p-6 bg-stone-50 dark:bg-stone-950 fixed inset-0 flex items-center justify-center z-1000"
          >
            <motion.div
              key="loading"
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{
                scale: { duration: 2, ease: "easeInOut" },
                rotate: { duration: 3, ease: "linear", repeat: Infinity }
              }}
              className="rounded-full h-80 w-80 border-t-10"
            ></motion.div>
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 1.5, duration: 2, ease: "easeInOut"}}
              className="fixed flex items-center justify-center"
            >
              <p className="text-3xl">Pulling Cards...</p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );

}