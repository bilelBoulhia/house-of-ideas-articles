'use client'
import ArticlesSubSection from "@/app/articles/sections/Articles-Sub-Section";
import {MiniArticleCard} from "@/components/minified-article-card";
import MinifiedNewsCardList from "@/components/minified-news-section";
import {fetch} from "@/utils/supabase/client-api";
import {Tables} from "@/utils/types";
import useSWR from "swr";




async  function   fetchArticle(): Promise<Tables<'articles'>[]>  {
    return await fetch<Tables<'articles'>>(
        "articles",
        ["id_article", "article_name", "category_id", "created_at", "average_read"],
        (q) => q.limit(3).order("created_at", {ascending: false})
    ) as Tables<'articles'>[]
}

export default  function Home(){
    const {data} = useSWR('/articles', fetchArticle)
    return (
        <div className='flex flex-row items-center justify-center w-full h-full'>

            <style>
                {`
                .overflow-y-scroll::-webkit-scrollbar {
                display: none;
                }`}
            </style>
            <div
                className='flex h-screen overflow-y-scroll   flex-col w-full lg:w-[80%] overflow-hidden items-center justify-center'>
                <ArticlesSubSection/>
            </div>

            <div className='relative w-[20%]  flex-col lg:flex hidden h-screen  border-l-[1px] text-center items-start justify-start border-neutral-800'>

                <div className='w-full mt-3 '>
                    <h3 className="text-lg text-start bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500  text-transparent bg-clip-text font-semibold p-4">Latest News</h3>
                    <MinifiedNewsCardList/>
                </div>


                <div className='text-start w-full mt-10'>
                <h3 className="text-lg font-semibold m-5 bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500  text-transparent bg-clip-text mb-4">latest articles</h3>
                        {data?.map((article, index) => (
                            <MiniArticleCard
                                key={index}
                                id={article.id_article}
                                category={article.category_id}
                                title={article.article_name}
                                date={article.created_at}
                                readTime={article.average_read}

                            />
                        ))}
                </div>

            </div>

        </div>

    )
}