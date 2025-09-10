import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";


const taglines = [
  "tweets are too short.",
  "notes aren’t enough.",
  "thoughts need space.",
  "captions can’t keep up.",
  "words matter more.",
];

const RotatingTagline = () => {
  //   const [index, setIndex] = useState(0);

  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       setIndex((prev) => (prev + 1) % taglines.length);
  //     }, 2000); // switch every 3s
  //     return () => clearInterval(interval);
  //   }, []);

  //   return (
  //     <h1 className="text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-700 text-center">
  //       Because{" "}
  //       <span className="text-primary">
  //         <AnimatePresence mode="wait">
  //           <motion.span
  //             key={taglines[index]}
  //             initial={{ opacity: 0, y: 10 }}
  //             animate={{ opacity: 1, y: 0 }}
  //             exit={{ opacity: 0, y: -10 }}
  //             transition={{ duration: 0.6 }}
  //           >
  //             {taglines[index]}
  //           </motion.span>
  //         </AnimatePresence>
  //       </span>
  //     </h1>
  //   );
  // };
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % taglines.length);
    }, 2000); // change every 3 sec
    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className="text-3xl sm:text-6xl font-semibold text-gray-700 text-center">
      Because{" "}
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.6 }}
          className="text-primary inline-block"
        >
          {taglines[index]}
        </motion.span>
      </AnimatePresence>
    </h1>
  );
};

export default RotatingTagline;
