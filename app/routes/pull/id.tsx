import type { Route } from "../+types/home";
import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from "react-router";
import { motion, AnimatePresence } from 'framer-motion';
import { MoonPhase } from "../../components/moon";
import { Spread } from "../../components/spread";
import { Footer } from "../../components/footer";
import CopyRouteButton from "../../components/copyRouteButton";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "A Tarot Pull • Subtle Cards" },
    { name: "description", content: "A spread of virtual tarot cards" },
  ];
}

// Loading animation component
const LoadingAnimation = () => {
  // Define animation variants for the cards
  const containerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 3,
        ease: "linear",
        repeat: Infinity
      }
    }
  };

  const cardVariants = {
    initial: { opacity: 0.7 },
    animate: (i: number) => ({
      opacity: [0.4, 1, 0.4],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        delay: i * 0.1
      }
    })
  };

  return (
    <motion.div 
      className="relative h-24 w-24 flex items-center justify-center"
      variants={containerVariants}
      animate="animate"
    >
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-stone-300 dark:bg-stone-500 rounded-md border-2 dark:border-stone-300"
          style={{
            width: "30px",
            height: "45px",
            transformOrigin: "center center",
            transform: `rotate(${i * 36}deg) translateY(-30px)`
          }}
          custom={i}
          variants={cardVariants}
          initial="initial"
          animate="animate"
        />
      ))}
    </motion.div>
  );
};

export default function PullById() {
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [pullData, setPullData] = useState<any>(false);

  let id = useParams().id as String;
  const location = useLocation();

  // Handle loader display with a delay
  useEffect(() => {
    let loaderTimer: NodeJS.Timeout;
    
    if (loading) {
      // Show loader after 500ms if still loading
      loaderTimer = setTimeout(() => {
        setShowLoader(true);
      }, 500);
    } else {
      // When loading completes, hide the loader
      setShowLoader(false);
    }
    
    return () => {
      if (loaderTimer) clearTimeout(loaderTimer);
    };
  }, [loading]);

  // Updated preload function to include card background
  const preloadImages = (cards: any[]) => {
    // Create array of promises for card images
    const cardImagePromises = cards.map(card => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = `https://subtle-cards.s3.us-east-1.amazonaws.com/Rider-Waite-Smith/${card.filename}.png`;
        img.onload = resolve;
        img.onerror = reject;
      });
    });
    
    // Add promise for card background image
    const cardBackPromise = new Promise((resolve, reject) => {
      const backImg = new Image();
      backImg.src = "https://subtle-cards.s3.us-east-1.amazonaws.com/card_bg.png";
      backImg.onload = resolve;
      backImg.onerror = reject;
    });
    
    // Return promise that resolves when all images are loaded
    return Promise.all([...cardImagePromises, cardBackPromise]);
  };

  useEffect(() => {
    if (location.state?.pullData) {
      setPullData(location.state.pullData);
      
      // Preload images for passed data
      preloadImages(location.state.pullData.cards)
        .then(() => {
          setImagesLoaded(true);
          setLoading(false);
        })
        .catch(error => {
          console.error("Error preloading images:", error);
          setImagesLoaded(true);
          setLoading(false);
        });
    } else {
      axios
        .get(`https://subtle-cards.val.run/pull/${id}`)
        .then((response) => {
          const fetchedPullData = response.data.message;
          setPullData(fetchedPullData);
          
          // Preload images for fetched data
          return preloadImages(fetchedPullData.cards);
        })
        .then(() => {
          setImagesLoaded(true);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching pull data:", error);
          setImagesLoaded(true);
          setLoading(false);
        });
    }
  }, [id, location.state]);

  if (!pullData && !loading) {
    return (
      <div id="pull" className="p-4 flex flex-col justify-center items-center gap-9 min-h-screen">
        <h1>Hmmm...</h1>
        <p className="mb-10 text-center">We can't find this pull. Would you like to create a <Link to="/pull/new">new tarot pull</Link>?</p>
        <Footer />
      </div>
    );
  }

  let timeCreated = new Date();
  let intention: string | boolean = false;

  if (pullData) {
    timeCreated = new Date(pullData.timestamp);
    intention = pullData.pullDetails.intention || false;
  }

  return (
    <div id="pull" className="p-4 flex flex-col justify-center items-center gap-9 min-h-screen">
      <AnimatePresence>
        {loading && showLoader ? (
          <motion.div 
            key="loader"
            className="fixed inset-0 flex flex-col gap-6 items-center justify-center bg-stone-50 dark:bg-stone-950 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LoadingAnimation />
            <p className="text-stone-400 text-center">Loading cards...</p>
          </motion.div>
        ) : (
          !loading && pullData && (
            <motion.div 
              key="content"
              className="flex flex-col gap-4 items-center my-4 w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Header Animation */}
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                A Tarot Pull
              </motion.h1>

              {/* Intention Animation */}
              {intention && (
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="text-center"
                >
                  <span className="text-stone-400 italic text-xl">Intention:</span><br />{intention}
                </motion.h2>
              )}

              {/* Time and Moon Phase Animation */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="text-stone-400 text-center"
              >
                Pulled at {timeCreated.toLocaleTimeString("en-US", {hour: 'numeric', minute:'numeric'})} on {timeCreated.toLocaleDateString("en-US", {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}<br />
                (<MoonPhase date={timeCreated} /> Moon)
              </motion.p>

              {/* Copy Route Button Animation */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                <CopyRouteButton />
              </motion.div>

              {/* Spread Animation (only render when images are loaded) */}
              {imagesLoaded && (
                <Spread 
                  spreadData={pullData} 
                />
              )}
            </motion.div>
          )
        )}
      </AnimatePresence>
      
      {/* Only show footer when not loading */}
      {!loading && <Footer />}
    </div>
  );
}