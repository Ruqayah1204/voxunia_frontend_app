"use client"

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const containerVariant: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
};

const itemVariant: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export function Footer() {
    return (
        <footer className="bg-[#1C2333] px-4 pt-10 sm:px-6 sm:pt-16 sm:pb-10">
            <div className="mx-auto max-w-7xl">
                
                    <motion.div
                        variants={containerVariant}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        className="flex flex-col gap-10 pb-10 border-b border-border/20 sm:flex-row sm:justify-between sm:gap-6"
                    >
                        <motion.div variants={itemVariant} className="max-w-sm">
                            <Link href="/">
                                <Image
                                    src="/voxunia-logo1.png"
                                    alt="Voxunia logo"
                                    width={160}
                                    height={40}
                                    priority
                                />
                            </Link>
                            <p className="mt-4 text-sm text-muted-foreground sm:text-base">
                                Making every voice heard in community meetups through real-time
                                Q&A and voting.
                            </p>
                        </motion.div>

                        <nav className="grid grid-cols-3 gap-8 font-lato sm:flex sm:gap-10">
                            <motion.div variants={itemVariant} className="flex flex-col gap-2 text-sm">
                                <p className="text-xs uppercase tracking-wide text-accent/40">Product</p>
                                <Link href="/" className="text-background/80 transition hover:text-accent/70">Features</Link>
                                <Link href="/" className="text-background/80 transition hover:text-accent/70">Pricing</Link>
                                <Link href="/" className="text-background/80 transition hover:text-accent/70">Integrations</Link>
                            </motion.div>
                            <motion.div variants={itemVariant} className="flex flex-col gap-2 text-sm">
                                <p className="text-xs uppercase tracking-wide text-accent/40">Company</p>
                                <Link href="/" className="text-background/80 transition hover:text-accent/70">About</Link>
                                <Link href="/" className="text-background/80 transition hover:text-accent/70">Blog</Link>
                                <Link href="/" className="text-background/80 transition hover:text-accent/70">Contact</Link>
                            </motion.div>
                            <motion.div variants={itemVariant} className="flex flex-col gap-2 text-sm sm:col-span-1">
                                <p className="text-xs uppercase tracking-wide text-accent/40">Legal</p>
                                <Link href="/" className="text-background/80 transition hover:text-accent/70">Privacy</Link>
                                <Link href="/" className="text-background/80 transition hover:text-accent/70">Terms</Link>
                            </motion.div>
                        </nav>
                    </motion.div>

                <p className="py-6 text-center text-sm text-white/60 sm:text-left">
                    &copy; {new Date().getFullYear()} Voxunia. All rights reserved.
                </p>
            </div>
        </footer>
    )
}