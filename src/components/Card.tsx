import Image from "next/image";
import React, { useState } from "react";
import Arrow from "../../public/arrow.svg";
import { AnimatePresence, motion } from "framer-motion";

interface CardProps {
  image: string;
}

const Card: React.FC<CardProps> = ({ image }) => {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <motion.div
      className="relative overflow-hidden min-h-[120px] min-w-[120px] md:min-h-[180px] md:min-w-[180px] lg:min-h-[250px] lg:min-w-[250px] bg-slate-400 rounded-xl flex justify-center items-center"
      onHoverStart={() => setShowOverlay(true)}
      onHoverEnd={() => setShowOverlay(false)}
    >
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            className="absloute inset-0 z-10 flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute bg-black pointer-events-none opacity-50 h-full w-full"></div>
            <motion.h1
              className="bg-white font-semibold text-[10px] md:text-sm z-10 px-3 py-2 rounded-full flex items-center gap-[0.5ch] hover:opacity-75"
              initial={{ y: 10 }}
              animate={{ y: 0 }}
              exit={{ y: 10 }}
            >
              <span>Explor Now</span>
              <Arrow className="h-4 w-4" />
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>
      <Image
        src={image}
        alt={image}
        fill
        sizes="(max-width: 250px) 100vw, (max-width: 180px) 50vw, 33vw"
        style={{ objectFit: "cover" }}
      />
    </motion.div>
  );
};

export default Card;
