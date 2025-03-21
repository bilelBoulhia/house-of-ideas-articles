"use client"
import { Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"
import { FacebookIcon, Instagram, LinkedInIcon, Tiktok } from "@/components/ui/Icons"
import InstagramProfile from "@/components/ui/instagram-profile"

const paragraph = "Follow our community to improve your skills, ideas, business, and creative thinking."

export default function Footer() {




    return (
        <div className="relative min-h-screen w-full flex flex-col lg:flex-row p-4 md:p-6 items-center justify-center overflow-hidden">
            <div className="relative w-full lg:w-1/2 py-4 space-y-8"
            >
                <div  className="space-y-6 md:space-y-10">
                    <div className="space-y-4">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500">
                            Let's Connect
                        </h2>
                        <div className="dark:text-white min-w-full max-w-md">
                            {paragraph}
                        </div>
                    </div>

                    <div className="space-y-6 text-sm sm:text-base md:text-lg">
                        <div  className="flex items-start space-x-4">
                            <div className="bg-purple-500/10 p-2.5 rounded-full mt-1">
                                <Mail className="h-5 w-5 text-purple-400" />
                            </div>
                            <div>
                                <p className="dark:text-gray-400 text-gray-600">Email us at</p>
                                <p className="dark:text-white font-medium">hoi.univalger3@gmail.com</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="bg-purple-500/10 p-2.5 rounded-full mt-1">
                                <Phone className="h-5 w-5 text-purple-400" />
                            </div>
                            <div>
                                <p className="dark:text-gray-400 text-gray-600">Call us at</p>
                                <p className="dark:text-white font-medium">+213 796 66 43 83</p>
                                <p className="dark:text-white font-medium">+213 552 55 33 24</p>
                            </div>
                        </div>

                        <div  className="flex items-start space-x-4">
                            <div className="bg-purple-500/10 p-2.5 rounded-full mt-1">
                                <MapPin className="h-5 w-5 text-purple-400" />
                            </div>
                            <div>
                                <p className="dark:text-gray-400 text-gray-600">Find us at</p>
                                <Link
                                    href="https://www.univ-alger3.dz/en/"
                                    className="dark:text-white hover:text-purple-400 transition-colors font-medium"
                                >
                                    University of Algiers 3
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div  className="space-y-4 pt-4">
                    <div className="space-y-3">
                        <h3 className="text-xl sm:text-2xl font-bold font-sans dark:text-white">Follow Us</h3>
                        <div className="flex space-x-4 sm:space-x-6">
                            <SocialLink href="https://www.facebook.com/profile.php?id=61552555332858">
                                <FacebookIcon className="h-5 w-5 dark:text-white group-hover:text-purple-400 transition-colors" />
                            </SocialLink>

                            <SocialLink href="https://www.tiktok.com/@clubhouseofideas">
                                <Tiktok className="h-5 w-5 text-white group-hover:text-purple-400 transition-colors" />
                            </SocialLink>

                            <SocialLink href="https://www.linkedin.com/company/house-of-ideas-club">
                                <LinkedInIcon className="h-5 w-5 dark:text-white group-hover:text-purple-400 transition-colors" />
                            </SocialLink>

                            <SocialLink href="https://www.instagram.com/hi.club.alger3/" className="lg:hidden">
                                <Instagram className="h-5 w-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
                            </SocialLink>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 p-5 hidden lg:block lg:w-1/2">
                <Link
                    href="https://www.instagram.com/houseofideas.club/"
                    className="block transform hover:scale-[1.02] transition-transform"
                >
                    <InstagramProfile />
                </Link>
            </div>

            <div

                className="absolute bottom-4 left-0 right-0 text-center text-xs sm:text-sm text-gray-400"
            >
                <p>
                    Made by bilel,{" "}
                    <Link href="https://github.com/bilelBoulhia" className="hover:text-purple-400 transition-colors">
                        Github
                    </Link>{" "}
                    {"<3"}
                </p>
            </div>
        </div>
    )
}


function SocialLink({ href, children, className }:{href:string,children:React.ReactNode,className?:string}) {
    return (
        <Link
            href={href}
            className={`h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all group hover:scale-110 ${className}`}
        >
            {children}
        </Link>
    )
}

