"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {StaticImageData} from "next/image";

let interval: any;

export type imgtype = {
  id: number,
  img: StaticImageData
}

export const CardStack = ({
  items,
  offset,
  scaleFactor,
}: {
  items: imgtype [];
  offset?: number;
  scaleFactor?: number;
}) => {
  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState<imgtype[]>(items);

  useEffect(() => {
    startFlipping();

    return () => clearInterval(interval);
  }, []);
  const startFlipping = () => {
    interval = setInterval(() => {
      setCards((prevCards: imgtype[]) => {
        const newArray = [...prevCards];
        newArray.unshift(newArray.pop()!);
        return newArray;
      });
    }, 5000);
  };

  return (
    <div className="relative  h-60 w-60 md:h-60 md:w-96">
      {cards.map((card, index) => {
        return (
          <motion.img
            key={card.id}
            src={card.img.src}
            alt='s'
            className="absolute object-cover dark:bg-black bg-white h-60 w-60 md:h-60 md:w-96 rounded-3xl shadow-xl flex flex-col justify-between"
            style={{
              transformOrigin: "top center",
            }}
            animate={{
              top: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR, // decrease scale for cards that are behind
              zIndex: cards.length - index, //  decrease z-index for the cards that are behind
            }}
          >

          </motion.img>
        );
      })}
    </div>
  );
};
