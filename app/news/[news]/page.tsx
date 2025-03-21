"use client"


import { Calendar, Clock, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

import { motion } from "motion/react"
import {fetch} from "@/utils/supabase/client-api";
import {Tables} from "@/utils/types";
import useSWR from "swr";
import {use} from "react";
import ShareButtons from "@/components/ShareButton";
import {Spinner} from "@/components/ui/Spinner";
import {useRouter} from "next/navigation";
import {fetchCategoryById} from "@/components/ui/Carousel";


async function fetchArticleById(Id: string): Promise<any> {
    const result = await fetch<Tables<"news">[]>(
        "news",
        ["*"],
        (q) => q.eq("id", Id)
    );

    return Array.isArray(result) && result.length > 0 ? result[0] : {};
}

const MoreNewsfetcher = async (id:string) => {

    return await fetch<Tables<'news'>>(
        "news",
        ["*"],
        (q) => q.limit(5).order("created_at", {ascending: false}).neq("id", id)
    ) as Tables<'news'>[];


}


export default function NewsPage({ params: paramsPromise }: { params: Promise<{ news: string }> }) {
    const params = use(paramsPromise);
    const {data:MoreNews} = useSWR('/news',()=>MoreNewsfetcher(params.news));
    const { data:featuredNews  } = useSWR<Tables<"news">>(`/news/${params.news}`, () => fetchArticleById(params.news));
    const router = useRouter();
    const handleRouterClick = (news:number) => {
        router.push(`/news/${news}`);
    };
    if (!featuredNews) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <Spinner />
            </div>
        );
    }

    if (!MoreNews) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <Spinner />
            </div>
        );
    }


    return (
        <div className="min-h-screen  w-full text-white">
         <div className="max-w-7xl  mx-auto px-4 sm:px-6 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-1 min-h-[70vh] lg:grid-cols-5 gap-8 bg-black/40 rounded-xl overflow-hidden border border-white/5"
                >

                    <div className="lg:col-span-3  relative h-[300px] lg:h-full min-h-[300px]">
                        <img
                            src={featuredNews?.news_picture || "/placeholder.svg"}
                            alt={featuredNews?.news_title}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent"></div>


                    </div>


                    <div className="lg:col-span-2 text-right p-6 flex flex-col">
                        <div className="mb-2 flex items-center gap-4 text-sm text-gray-300">
                            <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-2" />
                                <span>{featuredNews?.created_at}</span>
                            </div>
                            <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-2" />
                                <span>{featuredNews?.average_read}mn</span>
                            </div>
                        </div>

                        <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 text-transparent bg-clip-text">{featuredNews?.news_title}</h2>

                        <div className="space-y-3 mb-6  flex-grow">
                            {featuredNews?.news_content}
                         </div>

                        <div className="flex gap-3 mt-auto">

                            <ShareButtons link={`hiartciles.houseofideas.club/news/${params.news}`} />

                        </div>
                    </div>
                </motion.div>
            </div>



            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-purple-500">More News</h2>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {MoreNews?.map((news, index) => (
                        <motion.div
                            onClick={()=> handleRouterClick(news.id)}
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="30 rounded-lg overflow-hidden bg-black/40 border-white/5 border-[1px]  transition-all duration-300 flex flex-col h-full"
                        >
                            <div className="relative h-48">
                                <img src={news.news_picture || "/placeholder.svg"} alt={news.news_title} className="w-full h-full object-cover" />
                                <div className="absolute top-0 inset-x-0 h-full bg-gradient-to-b from-transparent to-gray-900/80"></div>

                                <div className="absolute bottom-3 left-3 flex items-center text-xs text-gray-300">
                                    <Calendar className="w-3 h-3 mr-1" />
                                    <span>{news.created_at}</span>
                                </div>
                            </div>

                            <div className="p-4 flex flex-col flex-grow">
                                <h3 className="font-bold text-lg mb-2 text-white  transition-colors">
                                    {news.news_title}
                                </h3>
                                <p className="text-gray-400 text-sm  mb-4 line-clamp-2">{news.news_content}</p>
                                <Button
                                    variant="ghost"
                                    className="mt-auto hover:bg-transparent  justify-start px-0 py-0"
                                >
                                    Read More <ChevronRight className="h-4 w-4 ml-1" />
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

        </div>
    )
}

