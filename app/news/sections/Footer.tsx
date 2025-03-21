import {FacebookIcon, Instagram, LinkedInIcon, Tiktok} from "@/components/ui/Icons";



export default function Footer() {
    return (

        <footer  id='ContactUs' className="  w-full  border-neutral-800  overflow-hidden border-t-[1px]">
            <div className="mx-auto w-full px-2 p-1 py-6 lg:py-8">
                <div className="md:flex md:justify-between ">

                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">

                        <div>
                            <h2 className="mb-6 text-xs font-semibold text-gray-900 uppercase dark:text-white">Contact</h2>
                            <ul className="text-gray-500 text-xs dark:text-gray-400 font-medium">

                                <li className="mb-4">
                                    <a href="https://www.univ-alger3.dz/en/" className="hover:underline ">university of algiers 3
                                    </a>
                                </li>

                                <li>

                                    <span >hoi.univalger3@gmail.com</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-xs font-semibold text-gray-900 uppercase dark:text-white">call
                                us</h2>
                            <ul

                                className="text-gray-500 text-xs dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <a href="https://wa.me/+213796664383" className="hover:underline z-20">+213 796 66
                                        43 83</a>
                                </li>
                                <li>
                                    <a href="https://wa.me/+213552553324" className="hover:underline">+213 552 55 33
                                        24</a>
                                </li>
                            </ul>
                        </div>


                    </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-neutral-800 lg:my-8"/>
                <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 sm:text-center dark:text-gray-400">©2024<span> House of ideas.</span></span>
                    <div className="flex  justify-center mt-0">


                        <a href="https://www.instagram.com/hi.club.alger3/"
                           className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                            <Instagram/>
                            <span className="sr-only">Instagram page</span>
                        </a>

                        <a href="https://www.facebook.com/profile.php?id=61552555332858&mibextid=LQQJ4d"
                           className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                            <FacebookIcon/>
                            <span className="sr-only">Instagram page</span>
                        </a>

                        <a href="https://www.tiktok.com/@clubhouseofideas"
                           className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                            <Tiktok/>
                            <span className="sr-only">Tiktok</span>
                        </a>

                        <a href="https://www.linkedin.com/company/house-of-ideas-club"
                           className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                            <LinkedInIcon/>
                            <span className="sr-only">Linkedin</span>
                        </a>


                    </div>
                </div>


            </div>
            <div className="flex mb-1 justify-center">
                <span className='text-gray-500 p-0 m-0 text-xs dark:text-gray-400 font-medium'> made by bilel, <a
                    href="https://github.com/bilelBoulhia" className='font-normal hover:underline '>Github</a> {"<3"}</span>
            </div>
        </footer>

    )
}

