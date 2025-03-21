import Header from "@/app/articles/sections/Header";
import Footer from "@/app/news/sections/Footer";

export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){
    return (
        <div className='font-serif flex w-full flex-col  overflow-hidden items-center justify-center'>
            <Header/>
            {children}
         <div className='w-full h-full relative'>
             <Footer/>
         </div>
        </div>
    )
}



