import {cn} from "@/lib/utils";

export const Tag = ({children,className}:{className?:string,children?:React.ReactNode}) => {
    return (
        <div className={cn("flex items-center space-x-4  p-4 rounded-lg",className)}>
            {children}
        </div>
    )
}