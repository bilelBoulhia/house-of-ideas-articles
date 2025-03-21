"use client"

import {useState, useEffect} from 'react'
import {motion, AnimatePresence} from 'motion/react'
import {X} from 'lucide-react'

interface ToastProps {
    show: { is:boolean,m:string }
    message: string
    onCloseAction: () => void
}

export default function Toast({show, onCloseAction}: ToastProps) {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (show.is) {
            setIsVisible(true)
            const timer = setTimeout(() => {
                setIsVisible(false)
                onCloseAction()
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [show, onCloseAction])

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{opacity: 0, y: 50, scale: 0.3}}
                    animate={{opacity: 1, y: 0, scale: 1}}
                    exit={{opacity: 0, y: 20, scale: 0.5}}
                    transition={{type: "spring", stiffness: 500, damping: 30}}
                    className="fixed inset-x-0   bottom-0 mx-auto mb-4 w-full max-w-sm"
                    style={{zIndex: 50}}
                >
                    <div className="bg-gradient-to-r m-2  from-purple-600 to-violet-600 rounded-lg shadow-lg overflow-hidden">
                        <div className="p-4 flex items-center justify-between">
                            <p className="text-white font-medium">{show.m}</p>
                            <button
                                onClick={() => {
                                    setIsVisible(false)
                                    onCloseAction()
                                }}
                                className="text-white hover:text-gray-200 transition-colors"
                            >
                                <X size={20}/>
                            </button>
                        </div>
                        <motion.div
                            initial={{width: "100%"}}
                            animate={{width: "0%"}}
                            transition={{duration: 5, ease: "linear"}}
                            className="h-1 bg-white"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}