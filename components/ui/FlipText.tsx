import {motion} from "motion/react";
import React from "react";

export const FlipText = ({ children  }:{children:string}) => {
    const DURATION = 0.5;
    const STAGGER = 0.025;

    return (
        <motion.span
            initial="initial"
            whileInView="hovered"
            className="relative   inline-block overflow-hidden whitespace-nowrap hover:cursor-default"
            style={{
                lineHeight: 0.75,
            }}
        >
            <div className="relative mb-1">
                {children.split("").map((l, i) => (
                    <motion.span
                        key={i}
                        variants={{
                            initial: { y: 0 },
                            hovered: { y: "-110%" },
                        }}
                        transition={{
                            duration: DURATION,
                            ease: "easeInOut",
                            delay: STAGGER * i,
                        }}
                        className="inline-block"
                    >
                        {l}
                    </motion.span>
                ))}
                <div className="absolute inset-0">
                    {children.split("").map((l, i) => (
                        <motion.span
                            key={i}
                            variants={{
                                initial: { y: "100%" },
                                hovered: { y: 0 },
                            }}
                            transition={{
                                duration: DURATION,
                                ease: "easeInOut",
                                delay: STAGGER * i,
                            }}
                            className="inline-block"
                        >
                            {l}
                        </motion.span>
                    ))}
                </div>
            </div>
        </motion.span>

    );
};