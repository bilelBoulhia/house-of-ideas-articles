import { motion } from "motion/react";
import React from "react";

export const NoData = ({sentence}:{sentence:string}) => (
    <div
        className="flex z-10 flex-col m-4 w-[90%]   min-h-[35rem] items-center justify-center p-8 rounded-3xl bg-gradient-to-br from-purple-700 to-purple-950 ">
        <motion.h2
            className="text-3xl md:text-4xl  font-bold text-center mb-6 text-white"
            initial={{opacity: 0, y: -20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
        >
            {sentence}
        </motion.h2>
        <motion.div
            className="p-6 rounded-2xl shadow-lg bg-white/10 backdrop-blur-md max-w-md w-full"
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5, delay: 0.2}}
        >
            <p className="text-lg mb-4 text-white">
                There will be more in the future!
            </p>
            <div className="flex items-center justify-between text-sm text-white/80">
                <span>check: Soon</span>
                <span>Stay tuned!</span>
            </div>
        </motion.div>
    </div>
)