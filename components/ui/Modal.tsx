"use client";
import {cn} from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import React, {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useRef,
    useState, forwardRef, useImperativeHandle,
} from "react";

import {Slot} from "@radix-ui/react-slot";

interface ModalContextType {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export interface ModalBodyRef {
    closeModal: () => void;
}
const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [open, setOpen] = useState(false);

    return (
        <ModalContext.Provider value={{ open, setOpen }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
};

export function Modal({ children }: { children: ReactNode }) {
    return    <ModalProvider>{children}</ModalProvider> ;
}

export const ModalTrigger = ({children, className, asChild
}:{
    children: ReactNode;
    className?: string;
    asChild:boolean;
}) => {
    const { setOpen } = useModal();
    const Comp = asChild ? Slot : "button"
    return (
        <Comp
            className={cn(className)}
            onClick={() => setOpen(true)}
        >
            {children}
        </Comp>
    );
};

export const ModalBody = forwardRef<ModalBodyRef, {
    children: ReactNode;
    className?: string;
}>(({children, className}, ref) => {
    const { open } = useModal();

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [open]);


    const modalRef = useRef<any>(null);
    const { setOpen } = useModal();
    useOutsideClick(modalRef, () => setOpen(false));
    useImperativeHandle(ref, () => ({
        closeModal: () => setOpen(false)
    }));

    return (
        <AnimatePresence >
            {open && (
                <motion.div

                    initial={{
                        opacity: 0,

                    }}
                    animate={{
                        opacity: 1,

                        backdropFilter: "blur(10px)",
                    }}
                    exit={{
                        opacity: 0,
                        backdropFilter: "blur(0px)",
                    }}

                    className="fixed [perspective:800px] [transform-style:preserve-3d] inset-0 h-full w-full  flex items-center justify-center z-50"
                >
                    <Overlay />

                    <motion.div
                        ref={modalRef}
                        className={cn(
                            "max-h-[80%] max-w-full md:max-w-[60%] mx-4 bg-white dark:bg-neutral-950 border border-transparent dark:border-neutral-800  rounded-2xl relative z-50 flex flex-col flex-1 overflow-hidden ",
                            className
                        )}
                        initial={{
                            opacity: 0,
                            scale: 0.5,
                            rotateX: 40,
                            y: 40,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            rotateX: 0,
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.8,
                            rotateX: 10,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 15,
                        }}
                    >
                        <CloseIcon />
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

    )})

export const ModalContent = ({
                                 children,
                                 className,
                             }: {
    children: ReactNode;
    className?: string;
}) => {
    return (
        <div  className={cn("flex flex-col dark:bg-black flex-1 p-10 overflow-y-auto ", className)}>
            {children}
        </div>
    );
};



const Overlay = ({ className }: { className?: string }) => {
    return (
        <motion.div

            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
                backdropFilter: "blur(10px)",
            }}
            exit={{
                opacity: 0,
                backdropFilter: "blur(0px)",
            }}
            className={`fixed  inset-0 h-full w-full bg-black bg-opacity-50 z-50 ${className}`}
        ></motion.div>
    );
};

const CloseIcon = () => {
    const { setOpen } = useModal();
    return (
        <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 group"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-black dark:text-white h-4 w-4 group-hover:scale-125 group-hover:rotate-3 transition duration-200"
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M18 6l-12 12" />
                <path d="M6 6l12 12" />
            </svg>
        </button>
    );
};


export const useOutsideClick = (
    ref: React.RefObject<HTMLDivElement>,
    callback: Function
) => {
    useEffect(() => {
        const listener = (event: any) => {

            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            callback(event);
        };

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, callback]);
};
