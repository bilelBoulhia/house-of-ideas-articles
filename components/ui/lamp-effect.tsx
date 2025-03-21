"use client";
import React from "react";
import { motion } from "motion/react";
import {cn} from "@/lib/utils";

export const LampContainer = ({
                                  children,
                                  className,
                              }: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div
            className={cn(
                "mt-[70px] items-center justify-center bg-black w-full rounded-md z-0",
                className
            )}
        >
            <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0 ">
                <motion.div
                    initial={{ opacity: 0.5, width: "35%" }}
                    whileInView={{ opacity: 1, width: "70%" }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                    style={{
                        backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
                    }}
                    className="absolute inset-auto right-1/2 h-56 overflow-visible w-[50%] bg-gradient-conic from-teal-600 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
                >
                    <div className="absolute w-[100%] left-0 bg-black h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
                    <div className="absolute w-40 h-[100%] left-0 bg-black bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0.5, width: "35%" }}
                    whileInView={{ opacity: 1, width: "70%" }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                    style={{
                        backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
                    }}
                    className="absolute left-1/2 overflow-hidden h-56 w-[50%] bg-gradient-conic from-transparent via-transparent to-teal-600 text-white [--conic-position:from_290deg_at_center_top]"
                >
                    <div className="absolute w-40 h-[100%] right-0 bg-black bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
                    <div className="absolute w-[100%] right-0 bg-black h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
                </motion.div>

                <motion.div
                    initial={{ width: "35%" }}
                    whileInView={{ width: "70%" }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                    className="absolute inset-auto z-50 h-0.5 w-full -translate-y-[7rem] bg-teal-100"
                ></motion.div>
            </div>
            <div className="z-50 flex flex-col items-center px-5">
                {children}
            </div>
        </div>
    );
};