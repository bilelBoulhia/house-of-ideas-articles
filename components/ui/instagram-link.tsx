"use client"

import {useEffect} from "react"
import {motion, useAnimation} from "motion/react"
import {Instagram} from "lucide-react"

interface InstagramLinkProps {
    href: string

}

export default function InstagramLink({href,

                                      }: InstagramLinkProps) {

    const controls = useAnimation()
    const instagramUsername = "more pictures at "

    useEffect(() => {
        controls.start({
            opacity: 1,
            x: 0,
            transition: {duration: 0.5},
        })
    }, [controls])

    const handleHoverStart = () => {

        controls.start({width: "auto", opacity: 1, x: 0})
    }

    const handleHoverEnd = () => {

        controls.start({width: 0, opacity: 0, x: -20})
    }

    return (
        <motion.div
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-600 to-pink-500  rounded-full"
            whileHover={{scale: 1.05}}
            whileTap={{scale: 0.95}}
        >
            <motion.a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center"
                onMouseEnter={handleHoverStart}
                onMouseLeave={handleHoverEnd}
            >
                <div className="bg-white p-2 rounded-full">
                    <Instagram className="w-4 h-4 text-pink-500"/>
                </div>
                <motion.div
                    initial={{width: 0, opacity: 0, x: -20}}
                    animate={controls}
                    className="overflow-hidden ml-2"
                >

                 <span className="block font-bold mr-2 text-sm text-white whitespace-nowrap">
                          @{instagramUsername}
                 </span>

                </motion.div>
            </motion.a>
        </motion.div>
    )
}