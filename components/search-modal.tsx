"use client"

import React, { useState } from "react"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "@/components/ui/dialog"
import { useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {motion} from "motion/react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/Tabs";
import {fetch} from "@/utils/supabase/client-api";
import {Tables} from "@/utils/types";
import useSWR from "swr";
import { ClockAlert} from "lucide-react";


async function fetchArticleWithCategory(articleId: number): Promise<any> {
    // First get the article to find its category_id
    const articleResult = await fetch<Tables<"articles">[]>(
        "articles",
        ["*"],
        (q) => q.eq("id_article", articleId)
    );
    
    if (!Array.isArray(articleResult) || articleResult.length === 0) {
        return null;
    }
    
    const article = articleResult[0];
    
    // Then get the category name using the article's category_id
    const categoryResult = await fetch<Tables<"categories">[]>(
        "categories",
        ["*"],
        (q) => q.eq("category_id", article.category_id)
    );
    
    console.log("Article:", article);
    console.log("Category:", categoryResult);
    
    if (Array.isArray(categoryResult) && categoryResult.length > 0) {
        return categoryResult[0].category_name;
    }
    
    return null;
}

const Newsfetcher = async (news_title:string) => {

    return await fetch<Tables<'news'>>(
        "news",
        ["*"],
        (q) => q.ilike("news_title", `%${news_title}%`)
    ) as Tables<'news'>[];



}

const articlefetcher = async (article_name:string) => {
    return await fetch<Tables<'articles'>>(
        "articles",
        ["*"],
        (q) => q.ilike("article_name", `%${article_name}%`)
    ) as Tables<'articles'>[];
}




export default function SearchModal() {
    const [isOpen, setIsOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState<string>("")

    const { data: articleResult } = useSWR(["/articles", searchQuery], () => articlefetcher(searchQuery), {
        keepPreviousData: true,
    });

    const { data: newsResult } = useSWR(["/news", searchQuery], () => Newsfetcher(searchQuery), {
        keepPreviousData: true,
    });



    const router = useRouter();

    const handleArticleRouterClick = async (articleId: number) => {
        try {
            const categoryName = await fetchArticleWithCategory(articleId);
            if (categoryName) {
                router.push(`/articles/${categoryName}/${articleId}`);
                setIsOpen(false);
            } else {
                console.error("Could not find category for article:", articleId);
                // Fallback: try to navigate without category or show error
                // router.push(`/articles/${articleId}`);
            }
        } catch (error) {
            console.error("Error fetching article category:", error);
        }
    };

    const handleNewsRouterClick = (newsId: number) => {
        router.push(`/news/${newsId}`);
        setIsOpen(false);
    };




    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>

                <Button className='hover:bg-transparent' variant="ghost">
                    <div className="md:hidden rounded-full  h-10 w-11 flex justify-center items-center">
                        <MagnifyingGlassIcon className=" dark:text-whites size-5"/>
                    </div>
                    <div className="hidden  md:block relative m-5 z-10  ">
                        <div
                            className="flex items-center justify-between dark:bg-white bg-neutral-100 rounded-full overflow-hidden"
                        >
                            <input
                                type="text"
                                placeholder="search"
                                className="w-full dark:bg-white bg-neutral-100 text-black/20 placeholder-neutral-400  px-4 py-2 focus:outline-none"

                            />

                            <div
                                className="rounded-full  h-10 w-11 flex justify-center items-center"
                            >
                                <MagnifyingGlassIcon className="w-5  text-purple-500  h-5 "/>
                            </div>
                        </div>

                        <motion.div
                            className="absolute inset-0  rounded-full"
                            initial={{opacity: 0}}
                            whileInView={{opacity: 1}}
                            transition={{duration: 0.2, delay: 0.6}}
                            style={{
                                boxShadow: '0 0 15px rgba(168, 85, 247, 0.5), 0 0 30px rgba(168, 85, 247, 0.3), 0 0 45px rgba(168, 85, 247, 0.1)',
                                pointerEvents: 'none'
                            }}
                        />
                    </div>
                </Button>


            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px] p-0">
                <DialogTitle></DialogTitle>
                <div className="p-4 border-b">

                    <motion.div
                        initial='hidden'
                        whileInView='visible'
                        viewport={{once: true}}
                        variants={{
                            hidden: {width: '0', opacity: 1},
                            visible: {width: '100%', opacity: 1}
                        }}
                        transition={{duration: 0.6, ease: 'easeInOut'}}
                        className="flex items-center justify-between dark:bg-white bg-neutral-100  rounded-full overflow-hidden"
                    >
                        <input
                            type="text"
                            placeholder="search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}

                            className="w-full dark:bg-white bg-neutral-100 text-white   dark:text-black placeholder-neutral-400  px-4 py-2 focus:outline-none"

                        />

                        <div
                            className="rounded-full  h-10 w-11 flex justify-center items-center"
                        >
                            <MagnifyingGlassIcon className="w-5  text-purple-500  h-5 "/>
                        </div>
                    </motion.div>
                </div>
                <Tabs defaultValue="articles" >
                    <TabsList className='w-full rounded-none bg-transparent border-b-[1px] border-neutral-800'>
                        <TabsTrigger value="articles">articles</TabsTrigger>
                        <TabsTrigger value="news">news</TabsTrigger>
                    </TabsList>
                    <TabsContent value="articles">
                        <ScrollArea className="max-h-[60vh] overflow-y-scroll p-4">
                            {articleResult && articleResult.length > 0 ? (
                                articleResult.map((result) => (
                                    <div

                                        key={result.id_article}
                                        className="mb-4 p-4 cursor-pointer bg-neutral-100 dark:bg-neutral-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        <h3
                                            onClick={() => handleArticleRouterClick(result.id_article)}
                                            className="text-lg hover:text-purple-600 font-semibold mb-2"
                                        >
                                            {result.article_name}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                                            {result.content.length > 100 ? `${result.content.substring(0, 100)}...` : result.content}
                                        </p>
                                        <Badge variant="secondary" className="text-xs">
                                            <ClockAlert className='h-auto w-4 mr-2'/>{result.average_read}mn
                                        </Badge>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-500 dark:text-gray-400">No results found</p>
                            )}
                        </ScrollArea>
                    </TabsContent>
                    <TabsContent value="news">
                        <ScrollArea className="max-h-[60vh] overflow-y-scroll p-4">
                            {newsResult && newsResult.length > 0 ? (
                                newsResult.map((result) => (
                                    <div
                                        key={result.id}
                                        className="mb-4 p-4 bg-neutral-100 cursor-pointer dark:bg-neutral-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        <h3
                                            onClick={() => handleNewsRouterClick(result.id)}
                                            className="text-lg hover:text-purple-600 font-semibold mb-2">{result.news_title}</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                                            {result.news_content.length > 100 ? `${result.news_content.substring(0, 100)}...` : result.news_content}
                                        </p>
                                        <Badge variant="secondary" className="text-xs">
                                            {result.created_at}
                                        </Badge>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-500 dark:text-gray-400">No results found</p>
                            )}
                        </ScrollArea>
                    </TabsContent>

                </Tabs>


            </DialogContent>
        </Dialog>
    )
}