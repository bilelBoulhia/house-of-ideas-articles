"use client"

import { cn } from "@/lib/utils"
import { AnimatePresence, type MotionValue, motion, useMotionValue, useSpring, useTransform } from "motion/react"
import Link from "next/link"
import type React from "react"
import { useRef, useState } from "react"
import { ChevronLeftIcon } from "@heroicons/react/16/solid"

export const FloatingDock = ({
                                 items,
                                 className,
                             }: {
    items: { title: string; icon: React.ReactNode; href: string }[]
    className?: string
    mobileClassName?: string
}) => {
    return (
        <>
            <FloatingDockDesktop items={items} className={className} />
        </>
    )
}

const FloatingDockDesktop = ({
                                 items,
                                 className,
                             }: {
    items: { title: string; icon: React.ReactNode; href: string }[]
    className?: string
}) => {
    const mouseY = useMotionValue(Number.POSITIVE_INFINITY)
    const [isOpen, setIsOpen] = useState(true)

    const toggleNav = () => {
        setIsOpen(!isOpen)
    }


    const buttonRotate = useSpring(isOpen ? 180 : 0, {
        stiffness: 300,
        damping: 25,
    })

    return (
        <div className={cn(className, "z-100 flex-row flex items-center gap-4")}>

            <motion.button
                onClick={toggleNav}
                className="relative flex  items-center justify-center w-8 h-8 rounded-full   hover:scale-105 transition-colors z-10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={false}

            >
                <motion.div style={{ rotate: buttonRotate }} className="flex items-center  justify-center">
                    <ChevronLeftIcon className="size-8" />
                </motion.div>
            </motion.button>


            <motion.div
                initial={false}
                animate={{
                    width: isOpen ? "4rem" : "0rem",
                    opacity: isOpen ? 1 : 0,
                    x: isOpen ? 0 : 10,
                }}
                transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                    mass: 1,
                    opacity: { duration: isOpen ? 0.2 : 0.1 },
                }}
                className="items-center  m-auto flex flex-col gap-4 rounded-2xl bg-gray-50 dark:bg-neutral-900 py-4 pb-3 "
                onMouseMove={(e) => mouseY.set(e.pageY)}
                onMouseLeave={() => mouseY.set(Number.POSITIVE_INFINITY)}
            >

                <AnimatePresence>
                    {isOpen &&
                        items.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    x: 0,
                                    transition: {
                                        delay: index * 0.05,
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 25,
                                    },
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.8,
                                    x: 20,
                                    transition: {
                                        delay: 0,
                                        duration: 0.15,
                                    },
                                }}
                            >
                                <IconContainer mouseY={mouseY} {...item} />
                            </motion.div>
                        ))}
                </AnimatePresence>
            </motion.div>
        </div>
    )
}

function IconContainer({
                           mouseY,
                           title,
                           icon,
                           href,
                       }: {
    mouseY: MotionValue
    title: string
    icon: React.ReactNode
    href: string
}) {
    const ref = useRef<HTMLDivElement>(null)

    const distance = useTransform(mouseY, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { y: 0, height: 0 }
        return val - bounds.y - bounds.height / 2
    })

    const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40])
    const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40])

    const widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20])
    const heightTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20])

    const width = useSpring(widthTransform, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    })
    const height = useSpring(heightTransform, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    })

    const widthIcon = useSpring(widthTransformIcon, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    })
    const heightIcon = useSpring(heightTransformIcon, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    })

    const [hovered, setHovered] = useState(false)

    return (
        <Link href={href}>
            <motion.div
                ref={ref}
                style={{ width, height }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="aspect-square rounded-full bg-gray-200 dark:bg-neutral-800 flex items-center justify-center relative"
            >
                <AnimatePresence>
                    {hovered && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, x: "-50%" }}
                            animate={{ opacity: 1, y: 0, x: "-50%" }}
                            exit={{ opacity: 0, y: 2, x: "-50%" }}
                            className="px-2 py-0.5 whitespace-pre rounded-md bg-gray-100 border dark:bg-neutral-800 dark:border-neutral-900 dark:text-white border-gray-200 text-neutral-700 absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs"
                        >
                            {title}
                        </motion.div>
                    )}
                </AnimatePresence>
                <motion.div style={{ width: widthIcon, height: heightIcon }} className="flex items-center justify-center">
                    {icon}
                </motion.div>
            </motion.div>
        </Link>
    )
}

