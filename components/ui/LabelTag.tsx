import {Sparkles} from "lucide-react";
import React from "react";
import {cn} from "@/lib/utils";


export const LabelTag =({className,Label}:{Label:string,className?:string})=>{
    return (
        <div className="absolute top-2 right-2 z-10">
            <div
                className={cn(" bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 text-white   dark:bg-gradient-to-r dark:from-blue-700 dark:via-indigo-700 dark:to-purple-700 dark:text-white text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-md transform hover:scale-105 transition-transform duration-200",className)}>
                <Sparkles className="w-3 h-3"/>
                {Label}
            </div>
        </div>
    )
}