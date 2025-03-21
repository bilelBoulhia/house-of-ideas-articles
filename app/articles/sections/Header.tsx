'use client'
import TubeLightNavbar from "@/components/Navbar";
import {NewHiIcon} from "@/components/ui/Icons";
import React from "react";
import SearchModal from "@/components/search-modal";
import { motion } from "motion/react";

export default function Header() {
    // const [searchQuery, setSearchQuery] = useState("");
    // const handleSearchQuery = function (searchQuery: string) {
    //     setSearchQuery(searchQuery);
    // }
    return (
        <header
            className="w-full  relative  flex justify-between items-center  z-50 dark:bg-neutral-900 border dark:border-gray-500/20 backdrop-blur-lg py-1 px-2  rounded-b-xl shadow-lg dark:shadow-black">
            <NewHiIcon className='w-[2rem] inline md:hidden' animate={true}/>

            <motion.a href={'/'} initial={{x: "-110%"}} animate={{x: 0}}
                      transition={{duration: 0.6}}
                      className='hidden md:inline font-bold bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500  text-transparent bg-clip-text'>house
                of ideas
            </motion.a>
            <div className='flex  justify-center items-center'>
                <TubeLightNavbar/>
                <div className='inline-block  md:min-w-[320px] '>
                    <SearchModal/>
                </div>


            </div>
        </header>
    )
}