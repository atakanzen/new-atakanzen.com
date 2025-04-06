"use client";

import { useEffect, useState } from "react";

const GlitchText = () => {
  const title = "a generalist.";
  const junk = [
    "#",
    "@",
    "%",
    "*",
    "&",
    "<",
    ">",
    "_",
    "=",
    "+",
    "[",
    "]",
    "|",
    "-",
    "!",
    "?",
    "X",
  ];
  const [glitchText, setGlitchText] = useState("?????????????");

  // Returns a promise that resolves when the animation finishes.
  const runGlitchAnimation = (speed: number = 1): Promise<void> => {
    return new Promise((resolve) => {
      const junkDuration = 5 * speed;
      const titleDuration = 6 * speed;

      for (let i = 0; i < title.length; i++) {
        for (let j = 0; j < junk.length; j++) {
          setTimeout(() => {
            setGlitchText((prevText) => {
              const chars = prevText.split("");
              chars[i] = junk[j];
              return chars.join("");
            });
          }, junkDuration * (i * junk.length + j));
        }

        setTimeout(() => {
          setGlitchText((prevText) => {
            const chars = prevText.split("");
            chars[i] = title[i];
            return chars.join("");
          });
        }, titleDuration * (i * junk.length + junk.length));
      }

      // Total animation duration calculation
      const totalTime = titleDuration * (title.length * junk.length);
      setTimeout(() => resolve(), totalTime);
    });
  };

  // Run fast animation twice on mount
  useEffect(() => {
    (async () => {
      await runGlitchAnimation(0.5); // faster: half the delay values
      await runGlitchAnimation(0.5);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // On hover run the normal animation once.
  const handleHoverOnGlitch = () => {
    runGlitchAnimation(2);
  };

  return (
    <div
      onMouseOver={handleHoverOnGlitch}
      onClick={handleHoverOnGlitch}
      id="glitch-text"
      className={`lg:hover:text-blue-500 sm:text-2xl lg:hover:cursor-help duration-500 select-none`}
    >
      {glitchText}
    </div>
  );
};

export default GlitchText;
