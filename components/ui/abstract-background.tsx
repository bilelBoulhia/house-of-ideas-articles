"use client"

import { motion } from "motion/react"

const pathVariants = {
    initial: {
        pathLength: 0,
        opacity: 0,
    },
    animate: {
        pathLength: 1,
        opacity: 1,
        transition: {
            pathLength: { duration: 2, ease: "easeInOut" },
            opacity: { duration: 0.5 },
        },
    },
}

// Hover animation for the gradient fill
const fillVariants = {
    initial: {
        opacity: 0.1,
    },
    hover: {
        opacity: 0.2,
        transition: {
            duration: 0.7,
        },
    },
}


export default function AbstractBackground() {
    return (
        <div className="absolute inset-0   overflow-visible">
            <div
                className="absolute inset-0 opacity-[0.15] dark:opacity-[0.07]"
                style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 1px)`,
                    backgroundSize: "32px 32px",
                }}
            />

            <motion.div
                initial={{height: 0}}
                animate={{height: "12rem"}}
                transition={{duration: 1, delay: 1.5}}
                className="absolute left-[20%] top-32 w-[1px] rotate-45 bg-violet-500 dark:bg-violet-700"
            />
            <motion.div
                initial={{height: 0}}
                animate={{height: "12rem"}}
                transition={{duration: 1, delay: 1.5}}
                className="absolute left-[22%] top-32 w-[1px] rotate-45 bg-violet-500/30 dark:bg-violet-700/30"
            />
            <motion.div
                initial={{height: 0}}
                animate={{height: "12rem"}}
                transition={{duration: 1, delay: 1.5}}
                className="absolute left-[24%] top-32 h-48 w-[1px] rotate-45 bg-violet-500/20 dark:bg-violet-700/20"
            />


            <div className="absolute left-1/3 top-1/4 flex gap-2">
                <div className="h-2 w-2 rounded-full bg-teal-500 dark:bg-teal-700" />
                <div className="h-2 w-2 rounded-full bg-teal-500/50 dark:bg-teal-700/50" />
                <div className="h-2 w-2 rounded-full bg-teal-500/25 dark:bg-teal-700/25" />
            </div>

            <div className="absolute left-1/2 bottom-[20%] h-32 w-32 -translate-x-1/2 -translate-y-1/2 ">
                <motion.svg
                    width="192"
                    height="192"
                    viewBox="0 0 192 192"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                >

                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" className="text-purple-500 dark:text-purple-700" stopOpacity="0.1"/>
                            <stop offset="100%" className="text-fuchsia-500 dark:text-fuchsia-700" stopOpacity="0.1"/>
                        </linearGradient>
                        <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="4"/>
                        </filter>
                    </defs>


                    <motion.rect
                        x="32"
                        y="32"
                        width="128"
                        height="128"
                        fill="url(#gradient)"
                        filter="url(#blur)"
                        variants={fillVariants}
                    />

                    {/* Animated border for main rectangle */}
                    <motion.rect
                        x="32"
                        y="32"
                        width="128"
                        height="128"
                        className="stroke-purple-500/50 dark:stroke-purple-700/30"
                        strokeWidth="1"
                        fill="none"
                        variants={pathVariants}
                    />




                    <motion.rect

                        width="64"
                        height="64"
                        className="stroke-purple-500/30 dark:stroke-purple-700/20"
                        strokeWidth="1"
                        fill="none"
                        variants={pathVariants}
                    />
                </motion.svg>
            </div>

            <div className="absolute bottom-32 left-20 flex items-center gap-4">
                <div className="h-24 w-[1px] bg-gradient-to-b from-cyan-500/80 to-transparent dark:from-cyan-700/60"/>
                <div className="h-16 w-[1px] bg-gradient-to-b from-cyan-500/60 to-transparent dark:from-cyan-700/40"/>
                <div className="h-8 w-[1px] bg-gradient-to-b from-cyan-500/40 to-transparent dark:from-cyan-700/20"/>
            </div>
        </div>
    )
}