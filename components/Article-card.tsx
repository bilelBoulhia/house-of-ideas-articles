"use client"
import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation";
import { Clock, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ArticleCardProps {
    article_name: string
    average_read: number | null
    created_at: string
    id_article: number
    category: string
    intro: string | null
    picture_link: string
}

export function ArticleCard({
                                article_name,
                                intro,
                                id_article,
                                average_read,
                                picture_link,
                                category,
                                created_at
                            }: ArticleCardProps) {
    const [imageError, setImageError] = useState(false)
    const router = useRouter();

    const handleRouterClick = (category: string, article: number) => {

        router.push(`/articles/${category}/${article}`);

    };

    return (
        <div
            onClick={() => handleRouterClick(category,id_article)}
            className={cn(
                "group relative overflow-hidden my-5 mx-3 rounded-xl bg-neutral-900 shadow-sm transition-all duration-200 hover:shadow-md cursor-pointer"
            )}
        >
            <div className="flex h-full flex-col md:flex-row">
                <div className="flex flex-1 flex-col rounded-xl justify-between p-5">
                    <div className="space-y-3">
                        <h2 className="line-clamp-2 text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-gray-50 md:text-xl">
                            {article_name}
                        </h2>
                        <p className="line-clamp-2 text-base text-gray-600 dark:text-gray-400">{intro}</p>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4"/>
                            <span>{created_at}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4"/>
                            <span>{average_read} min read</span>
                        </div>
                    </div>
                </div>
                <div className="relative h-52 w-full shrink-0 overflow-hidden md:h-auto md:w-2/5">
                    <Image
                        unoptimized
                        src={!imageError ? picture_link : "/placeholder.svg?height=400&width=600"}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={() => setImageError(true)}
                        sizes="(max-width: 768px) 100vw, 40vw"
                    />
                </div>
            </div>
        </div>
    )
}