import React from "react";
import WordTransform from "@/components/ui/animated-headingV2";
import { cn } from "@/lib/utils";

interface ThickWordTransformProps {
    initialWord: string;
    transformedWord: string;
    className?: string;
}

const ThickWordTransform: React.FC<ThickWordTransformProps> = ({
                                                                   initialWord,
                                                                   transformedWord,
                                                                   className,
                                                               }) => {
    return (
        <div className={cn("relative inline-block", className)}>

            <div className="absolute top-0 left-0">
                <WordTransform initialWord={initialWord} transformedWord={transformedWord} />
            </div>

            <div className="absolute top-[0.25px] left-[0.25px]">
                <WordTransform initialWord={initialWord} transformedWord={transformedWord} />
            </div>

            <div className="invisible">
                <WordTransform initialWord={initialWord} transformedWord={transformedWord} />
            </div>
        </div>
    );
};

export default ThickWordTransform;
