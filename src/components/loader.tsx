"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export const LogoLoader = () => {
    return (
        <div className=" flex min-h-screen items-center justify-center">
            <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                    transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <Image
                    src="/voxunia-icon.png"
                    alt="Loading"
                    width={56}
                    height={56}
                    priority
                    className="opacity-40"
                />


            </motion.div>

        </div>
    )
}