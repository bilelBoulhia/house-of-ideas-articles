import { motion } from "motion/react";
import Carousel from "@/components/ui/Carousel";
import ThickWordTransform from "@/components/ThickWordTransform";
import DescriptionFliper from "@/components/ui/Description-Fliper";
import {Tables} from "@/utils/types";
import {fetch} from "@/utils/supabase/client-api";
import useSWR from "swr";
const paragraph = `House of Ideas Articles, a website dedicated for learning, 
sharing articles on science, e-commerce & finance, and many more, adding a voice to the club and its community.`;

const fetcher = async () => {

    return await fetch<Tables<'articles'>>(
        "articles",
        ["*"],
        (q) => q.limit(3).order("created_at", {ascending: false})
    ) as Tables<'articles'>[];


}

export default function Hero() {
    const {data} = useSWR('/articles', fetcher)


    return (
        <>
            <style>
                {`
                .overflow-y-scroll::-webkit-scrollbar {
                display: none;
                }`}
            </style>

            {/*desktop*/}
            <div className="hidden lg:flex justify-center items-center lg:flex-row w-full relative px-4">

                <div
                    className="relative flex-col gap-[1rem] text-5xl [@media(min-width:450px)]:text-7xl sm:text-8xl min-h-screen lg:min-h-full justify-center items-start flex w-full xl:w-[60%]">
                    <motion.span
                        initial={{x: "-110%"}}
                        animate={{x: "0%"}}
                        transition={{duration: 0.75, delay: 1}}
                                 className="relative inline-block">
                        <span
                            className="absolute top-0 left-0 bg-clip-text font-bold text-transparent bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500">
                            HOUSE OF IDEAS
                        </span>
                        <span
                            className="relative bg-clip-text font-bold text-transparent bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500">
                            HOUSE OF IDEAS
                        </span>
                    </motion.span>
                    <span className="text-center" style={{fontWeight: 1000}}>
                        <ThickWordTransform initialWord="WELCOME TO " transformedWord="ARTICLES"/>
                    </span>
                    <DescriptionFliper className='text-xl' paragraph={paragraph}/>
                </div>
                <motion.div
                    initial={{
                        x: 650
                    }}
                    animate={{
                        x: 0,
                    }}
                    transition={{duration: 0.75, delay: 1}}
                    className="flex flex-col justify-center items-center w-full  min-h-screen xl:w-[40%]">
                    <Carousel articles={data ?? []}/>
                </motion.div>
            </div>


            <div className="flex lg:hidden flex-col px-4 ">
                <div className="overflow-y-scroll snap-y snap-mandatory h-screen">
                    <section className="snap-start">
                        <div className="relative flex-col gap-[1rem] text-4xl  [@media(min-width:360px)]:text-5xl [@media(min-width:450px)]:text-7xl sm:text-8xl min-h-screen justify-center items-start flex w-full xl:w-[60%]">
                            <motion.span initial={{x: "-150%"}} animate={{x: "0%"}}
                                         transition={{duration: 0.75, delay: 1}}
                                         className="relative inline-block">
                                <span
                                    className="absolute top-0 left-0 bg-clip-text font-bold text-transparent bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500">
                                    HOUSE OF IDEAS
                                </span>
                                <span
                                    className="relative bg-clip-text font-bold text-transparent bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500">
                                    HOUSE OF IDEAS
                                </span>
                            </motion.span>
                            <span className="text-center" style={{fontWeight: 1000}}>
                                <ThickWordTransform initialWord="WELCOME TO" transformedWord="ARTICLES"/>
                            </span>
                            <DescriptionFliper className='text-sm [@media(min-width:360px)]:text-xl' paragraph={paragraph}/>
                        </div>
                    </section>
                    <section className="snap-start">
                        <div className="flex flex-col justify-center items-center w-full min-h-screen">
                            <div className="relative text-center font-bold  max-w-2xl w-full mt-16  overflow-hidden">
                                <motion.span
                                    className="inline-block mx-1 "
                                    initial={{opacity: 0, x: -10}}
                                    whileInView={{opacity: 1, x: 0}}
                                    viewport={{once: true}}
                                    transition={{
                                        type: "spring",
                                        stiffness: 100,
                                        damping: 10,
                                        delay: 0.4
                                    }}
                                >
                                   check out
                                </motion.span>
                                <motion.span
                                    className="inline-block mx-1 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500"
                                    initial={{opacity: 0, y: -10}}
                                    whileInView={{opacity: 1, y: 0}}
                                    viewport={{once: true}}
                                    transition={{
                                        type: "spring",
                                        stiffness: 100,
                                        damping: 15,
                                        duration: 0.7
                                    }}
                                >
                                    our latest
                                </motion.span>


                                <motion.span
                                    className="inline-block mx-1  font-bold"
                                    initial={{opacity: 0, x: 10}}
                                    whileInView={{opacity: 1, x: 0}}
                                    viewport={{once: true}}
                                    transition={{
                                        type: "spring",
                                        stiffness: 100,
                                        damping: 10,
                                        delay: 0.5
                                    }}
                                >
                                    articles
                                </motion.span>
                            </div>

                            <Carousel articles={data ?? []}/>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}