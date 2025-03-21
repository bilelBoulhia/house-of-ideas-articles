"use client"

import { useRef, useState } from "react"
import { motion } from "motion/react"
import {  ArrowRight } from "lucide-react"
import Carousel from "@/components/ui/CarouselV2";

interface Article {
    title: string
    category: string
    image: string
    gradient: string
}

interface ArticleCarouselProps {
    articles: Article[]
}

export default function ArticleCarousel({ articles }: ArticleCarouselProps) {
    const carouselRef = useRef<HTMLDivElement>(null)
    const [scrollPosition, setScrollPosition] = useState(0)

    const handleScroll = (direction: "left" | "right") => {
        if(!carouselRef.current) return

        const scrollAmount = 320
        const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.clientWidth

        const newPosition = direction === "left" ? Math.max(scrollPosition - scrollAmount, 0) : Math.min(scrollPosition + scrollAmount, maxScroll)

        carouselRef.current.scrollTo({
            left: newPosition,
            behavior: "smooth",
        })

        setScrollPosition(newPosition)
    }

    return (
        <Carousel className="w-full">
                {articles.map((article, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex-shrink-0  group cursor-pointer  ">
                        <div className="bg-black/40 backdrop-blur-sm rounded-xl overflow-hidden border border-white/5 hover:border-purple-400/50 transition-all duration-500 h-full flex flex-col">

                            <div className="relative h-40 w-full overflow-hidden">
                                <img
                                    src={article.image || "/placeholder.svg"}
                                    alt={article.title}
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>


                                <div className={`absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${article.gradient}`}>
                                    {article.category}
                                </div>
                            </div>


                            <div className="p-4 flex flex-col flex-grow">
                                <h3 className="font-medium text-white mb-2 group-hover:text-purple-400 transition-colors duration-300 line-clamp-2">
                                    {article.title}
                                </h3>

                                <div className="mt-auto pt-4 flex justify-between items-center">
                                    <span className="text-xs text-gray-400">5 min read</span>
                                    <ArrowRight className="h-4 w-4 text-purple-400 transform transition-transform duration-300 group-hover:translate-x-1" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </Carousel>

    )
}

