import React, {useEffect, useState} from 'react';
import {cn} from "@/lib/utils";

const ViewportWrappper = ({children,className}:{className?:string,children:React.ReactNode}) => {
    const [vh, setVh] = useState(0);

    useEffect(() => {
        const updateVh = () => {
            setVh(window.innerHeight * 0.01);
        };

        updateVh();
        window.addEventListener('resize', updateVh);

        return () => window.removeEventListener('resize', updateVh);
    }, []);

    return (
        <div style={{minHeight: `${vh * 100}px`}} className={cn(className)}>
            {children}
        </div>

    );
};

export default ViewportWrappper;