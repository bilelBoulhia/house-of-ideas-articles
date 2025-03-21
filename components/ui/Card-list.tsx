
import React from "react";


type PropType = {

    children?: React.ReactNode[]

}



const CardList: React.FC<PropType> = ({children}) => {

    return(
        <div  className='pr-4 grid grid-flow-row gap-8 w-full iphone5:grid-cols-2 slighty-large-phone:grid-cols-3  sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7'>
            {children}
        </div>
    )
}
export{CardList}