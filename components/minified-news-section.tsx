"use client"
import { Card, CardFooter, CardHeader } from "@/components/ui/Card"
import { Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import {fetch} from "@/utils/supabase/client-api";
import {Tables} from "@/utils/types";
import useSWR from "swr";
import {Spinner} from "@/components/ui/Spinner";



const fetcher = async () => {

    return await fetch<Tables<'news'>>(
        "news",
        ["*"],
        (q) => q.limit(3).order("created_at", {ascending: false})
    ) as Tables<'news'>[];


}

export default function NewsCardList() {
    const [isMobile, setIsMobile] = useState(false)
    const {data} = useSWR('/news', fetcher);
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkScreenSize()
        window.addEventListener("resize", checkScreenSize)

        return () => window.removeEventListener("resize", checkScreenSize)
    }, [])
    if (!data) {
        return (
            <div className=" flex justify-center items-center">
                <Spinner />
            </div>
        );
    }
    return (
        <div>

            <div className="space-y-6 text-start">
                {data?.map((item) => (
                    <Card
                        key={item.id}
                        className="shadow-sm mx-2 hover:shadow-md transition-shadow duration-200 relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${item.news_picture})` }} />
                        <div className="absolute inset-0 backdrop-blur-xs bg-background/70" />

                        <CardHeader className="p-3 pb-0 relative z-10">
                            <div className="flex justify-between items-start">
                                <span className="text-xs text-muted-foreground">{item.created_at}</span>
                            </div>
                            <h4 className="font-medium text-sm line-clamp-2">{item.news_title}</h4>
                        </CardHeader>

                        <CardFooter className="p-3 pt-0 flex justify-between items-center relative z-10">
                            <div className="flex items-center text-xs text-muted-foreground">
                                <Clock className="h-3 w-3 mr-1" />
                                {item.average_read}mn
                            </div>
                            <Link
                                href={`/news/${item.id}`}
                                className="text-xs font-medium text-primary flex items-center hover:underline"
                            >
                                Read more
                                <ArrowRight className="h-3 w-3 ml-1" />
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}

