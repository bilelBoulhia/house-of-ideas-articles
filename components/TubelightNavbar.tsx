'use client'
import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

import Link from 'next/link';
import { Inter } from 'next/font/google';


import {GoHomeFill} from "react-icons/go";
import {GrArticle} from "react-icons/gr";

import {CgWebsite} from "react-icons/cg";
import {BiCategory} from "react-icons/bi";

const inter = Inter({ subsets: ["latin"], weight: "500" });

function TubeLightNavbar() {
  const [activeTab, setActiveTab] = useState('Home');
  const [isMobile, setIsMobile] = useState(false);
  const tabs = [
    { name: 'home', url: '#', icon: <GoHomeFill className='h-auto w-[1rem]' /> },
    { name: 'articles', url: '#', icon: <GrArticle className='h-auto w-[1rem]' /> },
    { name: 'categories', url: '#', icon: <BiCategory className='h-auto w-[1rem]' /> },
    { name: 'website', url: '#', icon: <CgWebsite className='h-auto w-[1rem]' /> }
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); 
    window.addEventListener('resize', handleResize); 

    return () => {
      window.removeEventListener('resize', handleResize); 
    };
  }, []);

  const getLeftPosition = (tabName:string) => {

    if (isMobile) {

      switch (tabName) {
        case 'home':
          return 'calc(0% + 15px)';
        case 'articles':
          return 'calc(23% + 2px)';
        case 'topics':
          return 'calc(22% + 2px)';
        case 'website':
          return 'calc(22% + 2px)';
      }
    } else {
      // Desktop view
      switch (tabName) {
        case 'Home':
          return 'calc(0% + 28px)';
        case 'articles':
          return 'calc(30% + 2px)';
        case 'topics':
          return 'calc(32% + 2px)';
        case 'website':
          return 'calc(32% + 2px)';
      }
    }
  };

  return (
    <div className='  z-50 mb-6 pt-6'>
      <div className={`${inter.className} flex   items-center sm:gap-2 gap-0 `}>
        {tabs.map((tab) => (
          <Link
            key={tab.name}
            href={tab.url}
            onClick={() => setActiveTab(tab.name)}
            className={`relative   cursor-pointer text-sm dark:text-white px-6 py-2 rounded-full`}


          >
            <span className="hidden  md:inline">{tab.name}</span>
            <span className="md:hidden">{tab.icon}</span>
            {activeTab === tab.name && (
              <motion.div
                layoutId="lamp"
                className="absolute left-1/2 transform dark:bg-white bg-black -translate-x-1/2 -top-2 w-8 h-1 rounded-xl"
                initial={false}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 30
                }}
                style={{ left: getLeftPosition(tab.name) }}
              />

            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
export default TubeLightNavbar;