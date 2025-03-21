import { motion } from "motion/react"
import { cn } from "@/lib/utils"

interface Props {
    className?: string
    paragraph: string
}

const DescriptionFliper = ({ className, paragraph }: Props) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.25 }}
            className={cn(className, "font-medium lg:text-left")}
        >
            {paragraph.split(",").map((sentence, index) => (
                <motion.span
                    key={index}
                    className="inline-block mr-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{once:true}}
                    transition={{
                        duration: 0.4,
                        delay: 0.75 + index * 0.15,
                        ease: "easeOut",
                    }}
                >
                    {sentence.trim()}
                    {index !== paragraph.split(",").length - 1 ? "," : ""}
                </motion.span>
            ))}
        </motion.div>
    )
}

export default DescriptionFliper

