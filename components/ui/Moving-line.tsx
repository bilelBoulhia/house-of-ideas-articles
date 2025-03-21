'use client'
import React, {FC, HTMLAttributes, useRef} from "react";
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
} from "motion/react";
import {cn} from "@/lib/utils";

interface props extends HTMLAttributes<HTMLDivElement> {
    className?: string,
    Content: { node: React.ReactNode }[];
}



const MovingLine : FC<props> = ({ Content ,className }) => {


    const transition = {
        duration: 14,
        ease: "easeInOut",
    };

    const ref = useRef<any>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["end end", "start start"],
    });

    const pathLengthValue = useTransform(scrollYProgress, [0, 1], [1, 0]);

    const PATH = "M0.5 0.980671L0.5 1566.02";
    return (
        <div
            className={cn(
                "max-w-4xl p-0 mx-auto flex flex-row space-x-10 items-start w-full",className)}
            ref={ref}
        >
            <svg
                width="1"
                height="1567"
                viewBox="0 0 1 1567"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0"
            >
                <path d={PATH} stroke="url(#paint0_linear_207_38)" />
                <defs>
                    <linearGradient
                        id="paint0_linear_207_38"
                        x1="1"
                        y1="-102.823"
                        x2="1"
                        y2="1566.02"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#14b8a6" stopOpacity="0" />
                        <stop offset="1" stopColor="#14b8a6" />
                    </linearGradient>
                </defs>
                <motion.path
                    style={{
                        pathLength: useSpring(pathLengthValue, {
                            stiffness: 500,
                            damping: 100,
                        }),
                    }}
                    transition={transition}
                    d={PATH}
                    stroke="#14b8a6"
                    strokeOpacity="1"
                    strokeLinecap="round"
                    strokeWidth="3"
                />
            </svg>
            <div className="flex flex-col w-full">
                {Content.map((c,i)=>(
                    <div key={i}>{c.node}</div>
                ))}
            </div>
        </div>
    );
};



export default MovingLine;