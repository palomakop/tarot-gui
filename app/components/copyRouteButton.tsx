import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const CopyRouteButton: React.FC = () => {
  const location = useLocation();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyRoute = async () => {
    const fullUrl = window.location.origin + location.pathname + location.search;

    try {
      await navigator.clipboard.writeText(fullUrl);
      
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <button 
      onClick={handleCopyRoute}
      className="relative md:absolute md:top-5 md:right-5 flex items-center justify-center rounded-md transition-colors duration-200 flex gap-2 w-[10ch] py-2 min-h-[1.7em] subtle-button"
      aria-label="Copy current route"
    >
      <AnimatePresence mode="wait">
        {isCopied ? (
          <motion.span
            key="copied"
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-stone-300 dark:text-stone-300 absolute"
          >
            Copied!
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            layout
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 absolute"
          >
            Copy link
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
};

export default CopyRouteButton;