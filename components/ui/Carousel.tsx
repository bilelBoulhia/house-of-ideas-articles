"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react"
import {Tables} from "@/utils/types";
import {fetch} from "@/utils/supabase/client-api";


interface Props {
    articles: Tables<'articles'>[]
}
export async function fetchCategoryById(Id: number): Promise<any> {
    const result = await fetch<Tables<"categories">[]>(
        "categories",
        ["*"],
        (q) => q.eq("category_id", Id)
    );

    return Array.isArray(result) && result.length > 0 ? result[0] : {};
}

const Carousel: React.FC<Props> = ({ articles }) => {

    const [currentIndex, setCurrentIndex] = useState(0)
    const router = useRouter();
    const handleRouterClick = async (categoryId: number, articleId: number) => {
        try {
            const category = await fetchCategoryById(categoryId);
            const categoryName = category?.category_name || "unknown";

            router.push(`/articles/${categoryName}/${articleId}`);
        } catch (error) {
            console.error("Error fetching category:", error);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length)
        }, 5000)

        return () => clearInterval(interval)
    }, [articles.length])

    return (
        <div className="relative w-full h-[80dvh] lg:h-[100dvh] rounded-lg flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
                {articles.map(
                    (article, index) =>
                        index === currentIndex && (
                            <motion.div
                                key={article.id_article}

                                className="absolute w-[95%] h-[85%] lg:h-[70%] bg-black bg-opacity-60 rounded-2xl shadow-xl shadow-black flex items-center justify-center overflow-hidden"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="relative w-full h-full group">
                                    <div className="absolute  inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-80" />
                                    <img
                                        alt={article.article_name ?? "No title available"}
                                        src={article.picture_link || "/placeholder.svg"}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80" />
                                    <div className="absolute max-w-96 bottom-0 left-0 right-0 p-6 text-white">
                                        <span className="text-3xl font-bold">{article.article_name}</span>
                                        <p className="text-sm opacity-80 line-clamp-6 mt-1 mb-4">{article.intro}</p>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => handleRouterClick(article.category_id, article.id_article)}
                                            className="relative group flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-white/20 to-white/10 border border-white/10 text-white font-medium transition-all duration-300 hover:border-white/20"
                                        >
                                            Read More
                                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        ),
                )}
            </AnimatePresence>

            <div className="absolute bottom-0 lg:bottom-[6rem] left-1/2 transform -translate-x-1/2 flex space-x-2">
                {articles.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full ${
                            index === currentIndex ? "bg-white" : "bg-gray-400"
                        } transition-colors duration-300`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}

export default Carousel

