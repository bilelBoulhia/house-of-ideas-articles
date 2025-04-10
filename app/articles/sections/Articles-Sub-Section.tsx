"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"
import { useEffect, useRef, useState, useCallback } from "react"
import { ArticleCard } from "@/components/Article-card"
import useSWR from "swr"
import { fetch } from "@/utils/supabase/client-api"
import { Tables } from "@/utils/types"
import { Spinner } from "@/components/ui/Spinner"




async function fetchCategories() : Promise<Tables<'categories'>[]>  {
    return await fetch<Tables<'categories'>>("categories", ["*"]) as Tables<'categories'>[]
}


async  function   fetchArticlesByCategory(categoryId: string | number): Promise<Tables<'articles'>[]>  {
    return await fetch<Tables<'articles'>>(
        "articles",
        ["id_article", "article_name", "category_id", "created_at", "picture_link", "average_read", "intro"],
        (q) => q.eq("category_id", categoryId).order("created_at", {ascending: false})
    ) as Tables<'articles'>[]
}
const ScrollableTabsList = ({
                                categories,
                                activeCategory,
                                onCategoryChange
                            }: {
    categories: Tables<'categories'>[],
    activeCategory: Tables<'categories'> | undefined,
    onCategoryChange: (category: Tables<'categories'>) => void
}) => {
    const tabsListRef = useRef<HTMLDivElement>(null)
    const [showLeftArrow, setShowLeftArrow] = useState(false)
    const [showRightArrow, setShowRightArrow] = useState(false)

    const checkForArrows = useCallback(() => {
        if (!tabsListRef.current) return

        const { scrollLeft, scrollWidth, clientWidth } = tabsListRef.current
        setShowLeftArrow(scrollLeft > 0)
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1)
    }, [])

    const scroll = (direction: "left" | "right") => {
        if (!tabsListRef.current) return

        const scrollAmount = 200
        const newScrollLeft = direction === "left"
            ? tabsListRef.current.scrollLeft - scrollAmount
            : tabsListRef.current.scrollLeft + scrollAmount

        tabsListRef.current.scrollTo({
            left: newScrollLeft,
            behavior: "smooth",
        })

        setTimeout(checkForArrows, 300)
    }

    useEffect(() => {
        checkForArrows()
        window.addEventListener("resize", checkForArrows)
        return () => window.removeEventListener("resize", checkForArrows)
    }, [checkForArrows])

    return (
        <div className="sticky bg-transparent top-0 z-10">
            {showLeftArrow && (
                <button
                    onClick={() => scroll("left")}
                    className="absolute left-0 top-1/2 z-20 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-background shadow-md border"
                    aria-label="Scroll left"
                >
                    <ChevronLeft className="h-5 w-5" />
                </button>
            )}

            <div className="relative overflow-hidden">
                <TabsList
                    ref={tabsListRef}
                    className="bg-transparent border-b-neutral-800 border-b-[1px] h-full w-full justify-start md:justify-center rounded-none py-4 px-1 z-10 overflow-x-auto flex gap-2"
                    onScroll={checkForArrows}
                    aria-label="Article categories"
                >
                    {categories.map((category) => (
                        <TabsTrigger
                            key={category.category_id}
                            onClick={() => onCategoryChange(category)}
                            value={category.category_name}
                            className="px-4 py-2 text-sm font-medium capitalize rounded-full border border-transparent data-[state=active]:border-primary/20 data-[state=active]:bg-neutral-900 data-[state=active]:text-primary transition-all duration-200 hover:bg-neutral-900"
                            aria-selected={activeCategory?.category_id === category.category_id}
                        >
                            {category.category_name}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </div>

            {showRightArrow && (
                <button
                    onClick={() => scroll("right")}
                    className="absolute right-0 top-1/2 z-20 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-background shadow-md border"
                    aria-label="Scroll right"
                >
                    <ChevronRight className="h-5 w-5" />
                </button>
            )}
        </div>
    )
}


const ArticleList = ({ category,articles, isLoading, error }: {
    articles: Tables<'articles'>[] | null | undefined,
    category:string,
    isLoading: boolean,
    error: any
}) => {
    if (error) {
        return <div className="p-8 text-center text-red-500">try again later</div>
    }

    if (isLoading) {
        return <div className="p-8 text-center"><Spinner /></div>
    }

    if (!articles || articles.length === 0) {
        return <div className="p-8 text-center text-gray-500">no articles available for now</div>
    }

    return (
        <div className="space-y-4 p-4">
            {articles.map((article) => (
                <ArticleCard category={category} key={article.id_article} {...article} />
            ))}
        </div>
    )
}

export default function ArticlesSubSection() {

    const {
        data: categories,
        error: categoriesError,
        isLoading: isCategoriesLoading
    } = useSWR<Tables<'categories'>[]>('categories', fetchCategories)

    const [activeCategory, setActiveCategory] = useState<Tables<'categories'> | undefined>()

    const {
        data: articles,
        error: articlesError,
        isLoading: isArticlesLoading
    } = useSWR(
        activeCategory ? ['articles', activeCategory.category_id] : null,
        () => activeCategory ? fetchArticlesByCategory(activeCategory.category_id) : null
    )

    useEffect(() => {
        if (categories && categories.length > 0 && !activeCategory) {
            setActiveCategory(categories[0])
        }
    }, [categories, activeCategory])


    if (categoriesError) {
        return <div className="p-8 text-center text-red-500">try again later</div>
    }

    if (isCategoriesLoading || !categories) {
        return <div className="p-8 text-center"><Spinner /></div>
    }


    const defaultTabValue = categories.length > 0 ? categories[0].category_name : ""

    return (
        <Tabs
            className="h-full w-full flex flex-col"
            defaultValue={defaultTabValue}
            value={activeCategory?.category_name}
        >
            <ScrollableTabsList
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
            />

            <div className="flex-1 overflow-y-auto" role="region" aria-label="Article content">
                {categories.map((category) => (
                    <TabsContent key={category.category_id} value={category.category_name}>
                        <ArticleList
                            articles={articles}
                            category={category.category_name}
                            isLoading={isArticlesLoading}
                            error={articlesError}
                        />
                    </TabsContent>
                ))}
            </div>
        </Tabs>
    )
}