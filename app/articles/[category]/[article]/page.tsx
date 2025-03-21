"use client";

import { use } from "react";
import { motion } from "motion/react";
import {ArrowRight, Calendar, Clock} from "lucide-react";
import Carousel from "@/components/ui/CarouselV2";
import { Tables } from "@/utils/types";
import { fetch } from "@/utils/supabase/client-api";
import useSWR from "swr";
import { Spinner } from "@/components/ui/Spinner";
import {Card} from "@/components/ui/Card";
import {BsJournal} from "react-icons/bs";
import ShareButtons from "@/components/ShareButton";
import {useRouter} from "next/navigation";

async function fetchArticleById(Id: number): Promise<any> {
    const result = await fetch<Tables<"articles">[]>(
        "articles",
        ["*"],
        (q) => q.eq("id_article", Id)
    );

    return Array.isArray(result) && result.length > 0 ? result[0] : {};
}

async function fetchArticlesByCategory(categoryId: number, articleId: number): Promise<Tables<"articles">[]> {
    return (
        (await fetch<Tables<"articles">>(
            "articles",
            ["id_article", "article_name", "category_id", "created_at", "picture_link", "average_read", "intro"],
            (q) => q.eq("category_id", categoryId).neq("id_article", articleId)
        )) ?? []
    );
}


export default function ArticlePage({ params: paramsPromise }: { params: Promise<{ category: string; article: number }> }) {
    const params = use(paramsPromise);

    const { data: article } = useSWR<Tables<"articles">>(
        `articles/${params.category}/${params.article}`,
        () => fetchArticleById(params.article)
    );

    const { data: RelatedArticles } = useSWR<Tables<"articles">[]>(
        `/${article?.category_id}/${article?.id_article}`,
        () => (article?.category_id ? fetchArticlesByCategory(article.category_id,article.id_article) : Promise.resolve([]))
    );
    const router = useRouter();
    const handleRouterClick = (category:string,article:number) => {
        router.push(`/articles/${category}/${article}`);
    };
    if (!article) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <Spinner />
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full  text-white">

            <div className="relative rounded-b-xl w-full h-[60vh] md:h-[50vh] lg:h-[60vh] overflow-hidden">
                <img src={article?.picture_link} alt={article?.article_name} className="object-cover w-full h-full" />
                <div className="absolute inset-0 rounded-b-xl bg-gradient-to-t from-black to-transparent"></div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-20 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-black/40 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/5"
                >
                    <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-sm font-medium mb-4">
                        {params.category}
                    </div>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 text-transparent bg-clip-text">
                        {article?.article_name}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 mb-8 text-gray-300">
                        <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span>{article?.created_at}</span>
                        </div>
                        <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            <span>{article?.average_read}mn</span>
                        </div>
                    </div>

                    <div className="space-y-4 mb-8">
                        <p className="text-gray-200 leading-relaxed">{article?.content}</p>
                    </div>

                    <div className="flex flex-wrap gap-4 mt-8">
                        <ShareButtons link={`hiartciles.houseofideas.club/articles/${params.category}/${params.article}`} />
                    </div>
                </motion.div>
            </div>

            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6, delay: 0.3}}
                className="w-full mx-auto py-16 overflow-hidden"
            >
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 text-transparent bg-clip-text text-center">
                        Read More Articles
                    </h2>
                </div>

                <div className="mx-auto  items-center flex justify-center ">
                    {(RelatedArticles || []).length > 0 ? (
                        <Carousel>
                            {RelatedArticles?.map((article, index) => (
                                <motion.div
                                    key={index}
                                    onClick={()=>handleRouterClick(params.category,article.id_article)}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="flex-shrink-0 group cursor-pointer h-full"
                                >
                                    <div className="bg-black/40 max-h-[350px] min-h-[350px] backdrop-blur-sm rounded-xl overflow-hidden border border-white/5 hover:border-purple-400/50 transition-all duration-500 h-full flex flex-col">
                                        <div className="relative w-full overflow-hidden">
                                            <img
                                                src={article.picture_link || "/placeholder.svg"}
                                                alt={article.article_name}
                                                className="object-cover w-full transition-transform duration-500 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

                                            <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-[#4158D0] via-[#C850C0] to-[#FFCC70]">
                                                {params.category}
                                            </div>
                                        </div>

                                        <div className="p-4 flex flex-col flex-grow">
                                            <h3 className="font-medium text-white mb-2 group-hover:text-purple-400 transition-colors duration-300 line-clamp-2">
                                                {article.article_name}
                                            </h3>
                                            <p className="line-clamp-2 text-base text-gray-600 dark:text-gray-400">{article.intro}</p>

                                            <div className="mt-auto pt-4 flex justify-between items-center">
                                                <span className="text-sm text-gray-400 inline-flex "><Clock
                                                    className='h-auto w-4 mr-1'/> {article.average_read} mn</span>
                                                <ArrowRight
                                                    className="h-4 w-4 text-purple-400 transform transition-transform duration-300 group-hover:translate-x-1"/>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </Carousel>
                    ) : (
                        <Card className="max-w-4xl bg-gradient-to-br  from-purple-600  text-white shadow-lg">
                            <div className="p-6 flex-row items-center justify-center gap-5 inline-flex ">
                                <h3 className="text-2xl  mb-2">No recommended articles</h3>

                                <div className="mt-4">
                                    <BsJournal className="w-12 h-12 animate-bounce" />
                                </div>
                            </div>
                        </Card>
                    )}

                </div>
            </motion.div>

        </div>
    );
}
