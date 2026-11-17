"use client"

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";


export const Hero = () => {
    const [code, setCode] = useState("");
    // const [error, setError] = useState("")
    const [isHighlighted, setIsHighlighted] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const searchParams = useSearchParams();

    
    const highlightAndFocusInput = () => {
        const input = inputRef.current;
        if(!input) return;

        input.scrollIntoView({ behavior: "smooth", block: "center" });
        input.focus();
        setIsHighlighted(true);

        setTimeout(() => setIsHighlighted(false), 1800)

    }

    useEffect(() => {
        if(searchParams.get("focus") !=="join-session") return;
        
        requestAnimationFrame(() => highlightAndFocusInput());
       
    }, [searchParams]);

    const handleJoin = () => {
        if(!code.trim() || code.trim().length !== 6) return
        router.push(`/join/${code.trim().toUpperCase()}`)
    }

    return (
        <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 sm:pt-24 sm:pb-28">
            <div className="mx-auto max-w-3xl text-center">
                <motion.span
                    initial={{opacity: 0, y:-20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.2}}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground shadow-soft"
                >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Built for community meetups
                </motion.span>
                <motion.h1 
                    initial={{opacity: 0, y:-20}}
                    animate={{opacity: 1, y:0}}
                    transition={{duration: 0.4}}
                    className="mt-6 text-4xl sm:text-7xl font-bricolage font-extrabold tracking-tight"
                >
                    Let your community <span className="text-primary italic">ask</span>,{" "}
              <span className="text-primary italic">vote</span>, and be heard.
                </motion.h1>
                <motion.p 
                    initial={{opacity: 0, y:20}}
                    animate={{opacity: 1, y:0}}
                    transition={{duration: 0.4, delay: 0.2}}
                    className="mt-5 text-lg text-muted-foreground sm:text-xl"
                >
                    Live Q&amp;A voting tool for that turns sessions into organized, high engagement experiences. 
                    Perfect for community meetups and live events.
                </motion.p>
                <motion.div
                    initial={{opacity:0, y:-20}}
                    animate={{opacity:1, y:0}}
                    transition={{duration: 0.2, delay:0.3}}
                    className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
                >
                    <Link href="/login"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full text-primary-foreground bg-primary px-6 py-3 font-semibold shadow-lift transition hover:brightness-105 sm:w-auto"
                    >
                        Create your first meetup 
                        <ArrowRight className="h-4 w-4"/>
                    </Link>
                    <Link href="/join"
                        className="inline-flex w-full items-center justify-center rounded-full bg-card border border-border px-6 py-3 font-semibold shadow-soft transition hover:bg-secondary sm:w-auto"
                    >
                        See how it works
                    </Link>
                </motion.div>

                {/* Attendee code shortcut */}
                <motion.div
                    initial={{opacity:0, y:20}}
                    animate={{opacity:1, y:0}}
                    transition={{duration: 0.3, delay:0.4}}
                >
                    <motion.form 
                        className="mx-auto mt-10 flex max-w-md items-center gap-2 rounded-full border border-border bg-card p-1.5 shadow-soft"
                        id="join-session"
                        onSubmit={(e) => {
                            e.preventDefault(); 
                            handleJoin();
                        }}
                        animate={
                            isHighlighted
                                ? { boxShadow: "0 0 0 4px var(--color-primary)" }
                                : { boxShadow: "0 0 0 0px transparent" }
                        }
                        transition={{ duration: 0.4 }}
                    >
                        <Input
                            ref={inputRef}
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="Have a session code? e.g AMBER-42"
                            className="flex-1 bg-transparent px-4 py-2 text-sm border-none placeholder:text-muted-foreground focus:ring-0!"
                        />
                        <Button
                            type="submit"
                            className="rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background transition hover:opacity-90"
                        >
                            Join
                        </Button>
                    </motion.form>
                </motion.div>
            </div>
        </section>
    )
}
// "use client"

// import { motion } from "framer-motion";
// import { ArrowRight } from "lucide-react";
// import Link from "next/link";
// import { Input } from "./ui/input";
// import { Button } from "./ui/button";
// import { useEffect, useRef, useState } from "react";
// import { useRouter } from "next/navigation";


// export const Hero = () => {
//     const [code, setCode] = useState("");
//     // const [error, setError] = useState("")
//     const [isHighlighted, setIsHighlighted] = useState(false);

//     const inputRef = useRef<HTMLInputElement>(null);
//     const router = useRouter();

    

//     const highlightAndFocusInput = () => {
//         const input = inputRef.current;
//         if(!input) return;

//         input.scrollIntoView({ behavior: "smooth", block: "center" });
//         setIsHighlighted(true);
//         setTimeout(() => setIsHighlighted(false), 1800)

//         input.focus();
//     }

//     useEffect(() => {
//         if(window.location.hash === "#join-session") {
//             requestAnimationFrame(() => highlightAndFocusInput());
//         }

//         const handleHashChange = () => {
//             if(window.location.hash === "#join-session") {
//                 highlightAndFocusInput();
//             }
//         };
//         window.addEventListener("hashchange", handleHashChange);
//         return () => window.removeEventListener("hashchange", handleHashChange);
//     }, []);

//     const handleJoin = () => {
//         if(!code.trim() && code.length !== 6) return
//         router.push(`/join/${code.trim().toUpperCase()}`)
//     }

//     return (
//         <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 sm:pt-24 sm:pb-28">
//             <div className="mx-auto max-w-3xl text-center">
//                 <motion.span
//                     initial={{opacity: 0, y:-20}}
//                     animate={{opacity: 1, y: 0}}
//                     transition={{duration: 0.2}}
//                     className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground shadow-soft"
//                 >
//                     <span className="h-1.5 w-1.5 rounded-full bg-primary" />
//                     Built for community meetups
//                 </motion.span>
//                 <motion.h1 
//                     initial={{opacity: 0, y:-20}}
//                     animate={{opacity: 1, y:0}}
//                     transition={{duration: 0.4}}
//                     className="mt-6 text-4xl sm:text-7xl font-bricolage font-extrabold tracking-tight"
//                 >
//                     Let your community <span className="text-primary italic">ask</span>,{" "}
//               <span className="text-primary italic">vote</span>, and be heard.
//                 </motion.h1>
//                 <motion.p 
//                     initial={{opacity: 0, y:20}}
//                     animate={{opacity: 1, y:0}}
//                     transition={{duration: 0.4, delay: 0.2}}
//                     className="mt-5 text-lg text-muted-foreground sm:text-xl"
//                 >
//                     Live Q&amp;A voting tool for that turns sessions into organized, high engagement experiences. 
//                     Perfect for community meetups and live events.
//                 </motion.p>
//                 <motion.div
//                     initial={{opacity:0, y:-20}}
//                     animate={{opacity:1, y:0}}
//                     transition={{duration: 0.2, delay:0.3}}
//                     className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
//                 >
//                     <Link href="/login"
//                         className="inline-flex w-full items-center justify-center gap-2 rounded-full text-primary-foreground bg-primary px-6 py-3 font-semibold shadow-lift transition hover:brightness-105 sm:w-auto"
//                     >
//                         Create your first meetup 
//                         <ArrowRight className="h-4 w-4"/>
//                     </Link>
//                     <Link href="/join"
//                         className="inline-flex w-full items-center justify-center rounded-full bg-card border border-border px-6 py-3 font-semibold shadow-soft transition hover:bg-secondary sm:w-auto"
//                     >
//                         See how it works
//                     </Link>
//                 </motion.div>

//                 {/* Attendee code shortcut */}
//                 <motion.div
//                     initial={{opacity:0, y:20}}
//                     animate={{opacity:1, y:0}}
//                     transition={{duration: 0.3, delay:0.4}}
                    
//                 >
//                     <motion.form 
//                         className="mx-auto mt-10 flex max-w-md items-center gap-2 rounded-full border border-border bg-card p-1.5 shadow-soft"
//                         id="join-session"
//                         animate={
//                             isHighlighted
//                                 ? { boxShadow: "0 0 0 4px var(--color-primary)" }
//                                 : { boxShadow: "0 0 0 0px transparent" }
//                         }
//                         transition={{ duration: 0.4 }}
//                     >
//                         <Input
//                             ref={inputRef}
//                             value={code}
//                             onChange={(e) => setCode(e.target.value)}
//                             onKeyDown={(e) => e.key === "Enter" && handleJoin()}
//                             placeholder="Have a session code? e.g AMBER-42"
//                             className="flex-1 bg-transparent px-4 py-2 text-sm border-none placeholder:text-muted-foreground focus:ring-0!"
//                         />
//                         <Button
//                             type="submit"
//                             className="rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background transition hover:opacity-90"
//                             onClick={handleJoin}
//                         >
//                             Join
//                         </Button>
//                     </motion.form>
//                 </motion.div>
//             </div>
//         </section>
//     )
// }