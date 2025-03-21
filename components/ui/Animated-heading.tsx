import {m} from "motion/react"
import {cn} from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority"

export type AnimatedHeading = {
  sentence: string[]
  className?: string
  firstsentenceClassName?: string
  size?: VariantProps<typeof Variants>["size"]
  color?: VariantProps<typeof Variants>["color"]
}

const Variants = cva("flex flex-row items-center text-center justify-center", {
  variants: {
    color:{
      default: "bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500",

    },

    size: {
      default: "iphone5:text-[1.75rem] z-12 medium-phone:text-[2.10rem] large-phone:text-5xl",
      xl: "text-3xl sm:text-5xl",
    },
  },
  defaultVariants: {
    size: "default",
      color:"default"
  },
})

export const AnimatedHeading = ({firstsentenceClassName, sentence, className,color, size }: AnimatedHeading) => {
  return (
    <div className={Variants({ size })}>
      <div className="relative flex-row flex items-end w-full justify-end">
        <m.h2
          initial={{ opacity: 1, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
          className={cn("uppercase  text-center mr-1 font-[1000]  text-black dark:text-white  tracking-tight",firstsentenceClassName)}
        >
          {sentence[0]}
        </m.h2>

        <div
          className={cn("absolute inset-0 h-full", className)}
          style={{
            zIndex: -1,
            left: "-100vw",
            right: "0",
          }}
        />
      </div>

      {/*


      */}
      <m.div
          whileInView={{zIndex: 2}}
          transition={{delay: 3}}
          viewport={{once: true}}
          style={{zIndex:-2}}

          className="flex-row flex items-start  w-full justify-start">
        <m.span

          viewport={{ once: true }}
          initial={{ opacity: 1, x: '-100%' }}
          whileInView={{ opacity: 1, x: 5 }}
          transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.6 }}
          className={cn("uppercase  text-center  font-[1000] tracking-tight",Variants({color}))}
        >
          {sentence[1]}
        </m.span>
      </m.div>
    </div>
  )
}