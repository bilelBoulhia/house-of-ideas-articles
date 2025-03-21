"use client";

import type React from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface LetterPairProps {
    initialLetter: string;
    transformedLetter: string;
    index: number;
    delay: number;
}

const LetterPair: React.FC<LetterPairProps> = ({
                                                   index,
                                                   initialLetter,
                                                   transformedLetter,
                                                   delay,
                                               }) => {
    return (
        <motion.span
            style={{ transform: `translateX(${index}ch)` }}
            className="inline-block relative will-change-transform"
        >
            <AnimatePresence>
                <motion.span
                    key={`i${initialLetter}-${delay}`}
                    initial={{ height: "auto" }}
                    animate={{ height: 0 }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + delay / 1500 }}
                    className="absolute overflow-hidden left-0 top-0"
                >
                    {initialLetter}
                </motion.span>

                <motion.span
                    key={`t${transformedLetter}-${delay}`}
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.5, delay: 1.25 + delay / 1500 }}
                    className="absolute overflow-hidden left-0 bottom-0"
                >
                    {transformedLetter}
                </motion.span>
            </AnimatePresence>
        </motion.span>
    );
};

interface WordTransformProps {
    initialWord: string;
    transformedWord: string;
    className?: string;
}

const WordTransform: React.FC<WordTransformProps> = ({
                                                         className,
                                                         initialWord,
                                                         transformedWord,
                                                     }) => {
    const letterPairs: Array<[string, string]> = initialWord.split("").map((letter, index) => [letter, transformedWord[index]]);

    return (
        <div
            className={cn(className, "whitespace-nowrap ")}>

            {letterPairs.map((pair, index) => (

                <LetterPair
                    key={index}
                    initialLetter={pair[0]}
                    transformedLetter={pair[1]}
                    delay={index * 100}
                    index={index}
                />
            ))}
        </div>
    );
};

export default WordTransform;

