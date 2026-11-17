"use client"

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";


type HeaderProps = {
  variant?: "app" | "landing" | "attendee";
  user?: string;
};

export function Header({variant = "landing", user}: HeaderProps){
    return (
        <header className="sticky top-0 z-30 bg-background/80 border-b border-border/60 backdrop-blur">
            <motion.div
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y:0}}
                className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6"
            >
                <Link href="/" className="">
                    <Image
                        src="/voxunia-logo1.png"
                        alt="voxunia-logo"
                        width={200}
                        height={50}
                        priority
                        className=""
                    />
                </Link>
                
                {variant == "landing" ? (
                    <nav className="flex items-center gap-2 font-lato ">
                        <Link href="/?focus=join-session" className="hidden sm:inline-block text-foreground/80 hover:text-foreground">Join a session</Link>
                        <Link href="/login" className="hidden sm:inline-block text-foreground/80 hover:text-foreground">Log in</Link>
                        <Link href="/signup" className="rounded-full text-sm bg-primary px-4 py-2 font-semibold text-primary-foreground shadow-soft transition hover:brightness-105">Get Started</Link>
                    </nav>
                ): variant == "attendee" ? (
                    <nav className="flex items-center gap-2">
                        <Link href="/" className="text-foreground/80 hover:text-foreground">
                            Home
                        </Link>
                    </nav>

                ) :(
                    <nav className="flex items-center gap-2">
                        <Link href="/dashboard" className="text-foreground/80 hover:text-foreground">
                            Dashboard
                        </Link>
                        <div className="ml-2 grid h-9 w-9 place-items-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">
                            {user ? user.charAt(0).toUpperCase() : "U"}
                        </div>
                    </nav>
                )}
            </motion.div>
        </header>
    )
}