"use client"

import { motion } from "motion/react"
import { ShoppingCart, LineChart, ArrowRight, Briefcase, Newspaper,} from "lucide-react"
import { Button } from "@/components/ui/button"
import DescriptionFliper from "@/components/ui/Description-Fliper";

export default function CategorySection() {
  const categories = [
    {
      title: "Entrepreneurship",
      icon: Briefcase,
      gradient: "from-[#4158D0] via-[#C850C0] to-[#FFCC70]",

    },
    {
      title: "E-commerce & Business",
      icon: ShoppingCart,
      gradient: "from-[#0093E9] to-[#80D0C7]",

    },
    {
      title: "Finance & Economics",
      icon: LineChart,
      gradient: "from-[#8EC5FC] to-[#E0C3FC]",

    },
    {
        title: "College News",
          icon: Newspaper,
          gradient: "from-[#fcdd8e] to-[#472fa3]"

    },

  ]
const pargraph= 'check out and expansion of unique, interesting, genre of articles'
  return (

        <div className="min-h-screen  flex items-center w-full  justify-center relative overflow-hidden">
          <div className="flex flex-col lg:flex-row">

            <div className="lg:w-[50%] p-8  flex flex-col justify-center relative">
              <motion.div
                  initial={{opacity: 0, x: -20}}
                  animate={{opacity: 1, x: 0}}
                  transition={{duration: 0.6}}
                  className="relative w-full  text-center lg:text-left z-10"
              >
                <h2 className=" text-2xl [@media(min-width:360px)]:text-4xl sm:text-6xl  py-3  lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500  text-transparent bg-clip-text">
                  Explore our categories
                </h2>
                  <div className='py-4 hidden [@media(min-width:360px)]:inline '>
                       <DescriptionFliper paragraph={pargraph} className='  dark:text-white mb-8 text-black '/>
                  </div>
                <a href="/articles" target="_blank" rel="noopener noreferrer">
                <Button

                    className="group relative  inline-flex items-center justify-center px-8 py-6 text-md text-white transition-all duration-300 ease-in-out bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full overflow-hidden shadow-lg hover:shadow-purple-500/25">
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></span>
                  <span
                      className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                  <span className="relative flex items-center">Explore more
                             <ArrowRight className="ml-2  size-5 transition-transform duration-300 ease-in-out group-hover:translate-x-1"/>
                           </span>
                </Button>
                </a>
              </motion.div>
            </div>
            <div className="lg:w-[50%]  flex justify-center items-center">
              <div
                  className="max-w-6xl mx-auto flex flex-col sm:flex-row lg:flex-wrap xl:grid xl:grid-cols-2 justify-around gap-2 sm:gap-3">
                {categories.map((category, index) => (
                    <motion.div
                        key={category.title}
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.6, delay: index * 0.1}}
                        className="group w-full sm:max-w-[15rem]"
                    >
                      <div
                          className="relative bg-black/40 backdrop-blur-sm rounded-xl sm:rounded-2xl px-3 sm:p-6 h-[50px] sm:h-[200px] overflow-hidden border border-white/5 hover:border-purple-400/50 transition-all duration-500">
                        <div className="relative h-full flex flex-row sm:flex-col items-center sm:items-start">
                          <div
                              className={`w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${category.gradient} p-[1px] backdrop-blur-xl`}
                          >
                            <div className="w-full h-full rounded-lg sm:rounded-xl bg-black/80 flex items-center justify-center">
                              <category.icon className="w-4 h-4 sm:w-6 sm:h-6 text-purple-400"/>
                            </div>
                          </div>

                          <div className="ml-3 sm:ml-0 sm:mt-auto">
                            <h3 className="font-medium text-white mb-0 sm:mb-2 group-hover:text-purple-400 transition-colors duration-300">
                              {category.title}
                            </h3>
                          </div>

                        </div>
                      </div>
                    </motion.div>
                ))}

              </div>
            </div>
          </div>
        </div>

  )
}

