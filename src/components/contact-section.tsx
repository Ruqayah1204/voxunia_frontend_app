"use client"

import { motion, Variants } from "framer-motion";
import Link from "next/link";


const headerVariant: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};


const buttonVariant: Variants = {
    hidden: { opacity: 0, y: -20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.3, ease: "easeOut" } },
};

export const ContactSection = () => {
    return (
        <section className="bg-[#1C2333] border-b border-border/20">
            <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 sm:pt-20 pb-6">
                <div className="mb-10 text-center mx-auto max-w-2xl">
                    <motion.h2
                        variants={headerVariant}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.4 }}
                        className="text-3xl text-white font-bold font-bricolage tracking-tight sm:text-[2.5rem]"
                    >
                        Ready to host your next meetup?
                    </motion.h2>
                    <motion.p
                        variants={headerVariant}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ delay: 0.1 }}
                        className="mt-2 text-lg text-muted-foreground sm:text-xl"
                    >
                        Join thousands of organizers who use Voxunia to make
                        their events more interactive and memorable.
                    </motion.p>
                    <motion.div
                        variants={buttonVariant}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.4 }}
                        className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
                    >
                        <Link
                            href="/login"
                            className="inline-flex w-full items-center justify-center gap-2 rounded-full text-primary-foreground bg-primary px-6 py-3 font-semibold shadow-lift transition hover:brightness-105 hover:shadow-xl sm:w-auto"
                        >
                            Get started for free
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}