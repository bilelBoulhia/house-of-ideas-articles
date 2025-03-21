'use client'
import { Clock } from 'lucide-react'
import {fetchCategoryById} from "@/components/ui/Carousel";
import {useRouter} from "next/navigation";


interface MiniArticleCardProps {
    title: string
    date: string
    readTime: number | null
    category: number
    id:number
}

export function MiniArticleCard({ title,category,id, date, readTime }: MiniArticleCardProps) {
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

    return (
        <div
            onClick={()=>handleRouterClick(category,id)}
            className="block p-3 text-start my-2 border-b-[1px] mx-3 cursor-default hover:bg-neutral-900 rounded-sm  transition-colors duration-200"
        >
            <h1 className="font-medium text-start text-xs line-clamp-1 mb-2">{title}</h1>
            <div className="flex items-center text-xs text-gray-500 space-x-3">
                <span>{date}</span>
                <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{readTime} mn</span>
                </div>
            </div>
        </div>
    )
}
