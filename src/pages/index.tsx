import Card from "@/components/Card";
import useMeasure from "react-use-measure";

import { animate, motion, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const images = [
    "/image-1.jpg",
    "/image-2.jpg",
    "/image-3.jpg",
    "/image-4.jpg",
    "/image-5.jpg",
    "/image-6.jpg",
    "/image-7.jpg",
    "/image-8.jpg",
  ];

  const FAST_DURATION = 25;
  const SLOW_DURATION = 150;

  const [duration, setDuration] = useState(FAST_DURATION);

  let [sliderRef, { width }] = useMeasure();

  const xTranslation = useMotionValue(0);

  const [mustFinsh, setMustFinish] = useState(false);
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    let controls;
    let finalPosition = -width / 2 - 8;

    if (mustFinsh) {
      controls = animate(xTranslation, [xTranslation.get(), finalPosition], {
        ease: "linear",
        duration: duration * (1 - xTranslation.get() / finalPosition),
        onComplete: () => {
          setMustFinish(false);
          setRerender(!rerender);
        },
      });
    } else {
      controls = animate(xTranslation, [0, finalPosition], {
        ease: "linear",
        duration: duration,
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
      });
    }

    return controls?.stop;
  }, [width, xTranslation, duration, mustFinsh, rerender]);

  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container">
        <div className="max-w-[540px] mx-auto">
          <div className="flex justify-center">
            <div className="text-sm inline-flex border border-[#222]/10 px-3 py-1 rounded-lg tracking-tight">
              Everything you need
            </div>
          </div>

          <h2 className="text-center text-3xl md:text-[54px] md:leading-[70px] font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-5">
            Streamlined for easy management
          </h2>
          <p className="text-center text-[22px] leading-[30px] tracking-tight text-[#010D3E] mt-5">
            Enjoy customizable lists, team work tools, and smart tracking all in
            one place. Set tasks, get reminders, and see your progress simply
            and quickly.
          </p>
        </div>

        <div className="flex overflow-hidden mt-10 [mask-image:linear-gradient(to_left,transparent,black,transparent)]">
          <motion.div
            className="flex gap-4 
            "
            ref={sliderRef}
            style={{ x: xTranslation }}
            onHoverStart={() => {
              setMustFinish(true);
              setDuration(SLOW_DURATION);
            }}
            onHoverEnd={() => {
              setMustFinish(true);
              setDuration(FAST_DURATION);
            }}
          >
            {[...images, ...images].map((item, idx) => (
              <Card image={item} key={idx} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
