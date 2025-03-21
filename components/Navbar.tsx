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

  // const tabs = [
  //   { name: 'home', url: '#' },
  //   { name: 'website', url: '#' }
  // ];




  return (
    <div className='  z-50 mb-6 pt-6'>
      <div className={`${inter.className} flex px-6 py-2  items-center sm:gap-2 gap-0 `}>
        {/*{tabs.map((tab) => (*/}
        {/*  <Link*/}
        {/*    key={tab.name}*/}
        {/*    href={tab.url}*/}
        {/*    className='relative   cursor-pointer text-sm dark:text-white px-6 py-2 rounded-full'*/}
        {/*  >*/}
        {/*    <span className="">{tab.name}</span>*/}
        {/*  </Link>*/}
        {/*))}*/}
      </div>
    </div>
  );
}
export default TubeLightNavbar;