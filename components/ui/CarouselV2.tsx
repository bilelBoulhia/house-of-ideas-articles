"use client"

import React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"


const Carousel = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isLargeScreen, setIsLargeScreen] = useState(false)
    const [windowSizeKey, setWindowSizeKey] = useState(0);
    const totalSlides = React.Children.count(children)
    const cardsToShow = 3

    useEffect(() => {
        const checkScreenSize = () => {
            setIsLargeScreen(window.innerWidth >= 860)
            setWindowSizeKey(prevKey => prevKey + 1);
        };
        checkScreenSize()

        window.addEventListener("resize", checkScreenSize)
        return () => window.removeEventListener("resize", checkScreenSize)
    }, [])
    const nextSlide = () => {
        if (isLargeScreen) {

            const maxIndex = totalSlides - cardsToShow
            setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1))
        } else {

            setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides)
        }
    }

    const prevSlide = () => {
        if (isLargeScreen) {

            const maxIndex = totalSlides - cardsToShow
            setCurrentIndex((prevIndex) => (prevIndex <= 0 ? maxIndex : prevIndex - 1))
        } else {

            setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides)
        }
    }


    if (!isLargeScreen) {
        return (
            <div className={`relative ${className}`}>
                <div className="flex overflow-hidden">
                    {React.Children.map(children, (child, index) => (
                        <div className={`transition-transform w-full duration-500 ${index === currentIndex ? "block" : "hidden"}`}>
                            <div className="px-12">{child}</div>
                        </div>
                    ))}
                </div>

                <div>
                    <Button
                        onClick={prevSlide}
                        className="absolute left-0  top-1/2 transform -translate-y-1/2 rounded-full bg-black/60 border-white/10 text-white hover:bg-purple-900/50 hover:text-white h-9 w-9 sm:h-10 sm:w-10"
                    >
                        <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                    <Button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 rounded-full bg-black/60 border-white/10 text-white hover:bg-purple-900/50 hover:text-white h-9 w-9 sm:h-10 sm:w-10"
                    >
                        <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className={`relative ${className}`}>
            <div className="overflow-hidden">
                <div
                    className="flex transition-transform duration-500"
                    style={{
                        transform: `translateX(-${(currentIndex * 100) / totalSlides}%)`,
                        width: `${(totalSlides * 100) / cardsToShow}%`,
                    }}
                >
                    {React.Children.map(children, (child) => (
                        <div className="px-4" style={{ width: `${100 / totalSlides}%` }}>
                            {child}
                        </div>
                    ))}
                </div>
            </div>

            <Button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 rounded-full bg-black/60 border-white/10 text-white hover:bg-purple-900/50 hover:text-white h-10 w-10 z-10"
            >
                <ArrowLeft className="h-5 w-5" />
            </Button>
            <Button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 rounded-full bg-black/60 border-white/10 text-white hover:bg-purple-900/50 hover:text-white h-10 w-10 z-10"
            >
                <ArrowRight className="h-5 w-5" />
            </Button>
        </div>
    )
}

export default Carousel

