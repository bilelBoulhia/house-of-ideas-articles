
import React from "react";
import {cn} from "@/lib/utils";

export  default function Skeleton({children,className,repeat = 6}: {repeat?:number,className?: string,children?: React.ReactNode}) {
    return (
            <div className={cn(" w-full ", className)}>
                {[...Array(repeat)].map((_, i) => (
                    <div key={i}>
                        {children}
                    </div>
                ))}
            </div>
    )
}