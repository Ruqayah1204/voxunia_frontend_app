"use client"

import { motion, Variants } from "framer-motion";
import { LinkIcon, MessageSquare, ThumbsUp } from "lucide-react";

import { Card, CardContent } from "./ui/card";

const steps = [
    {
        id: 1,
        no: "01",
        title: "Join instantly",
        description: "Attendee join in seconds with a simple code or QR scan. Fast, easy and inclusive",
        icon: LinkIcon,
    },
    {
        id: 2,
        no: "02",
        title: "Ask Question",
        description: "Submit questions in real-time. Use moderation tools to keep conversation productive and on-topic",
        icon: MessageSquare,
    },
    {
        id: 3,
        no: "03",
        title: "Vote for value",
        description: "Upvote questions you most want answered. Community voting ensures you address what matters most to your audience",
        icon: ThumbsUp,
    }
]

const headerVariant: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

// Applied to the grid container — staggerChildren tells Framer to delay
// each child's animation slightly after the previous one, instead of
// all three cards popping in at the exact same instant.
const gridVariant: Variants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const cardVariant: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export const HowItWorks = () => {
    return (
        <section className="bg-white">
            <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 sm:pt-24 sm:pb-28 pb-24">
                <div className="mb-10 text-center mx-auto max-w-2xl">
                    <motion.h2
                        variants={headerVariant}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.4 }}
                        className="text-2xl font-bold font-bricolage tracking-tight sm:text-3xl"
                    >
                        Community engagement, simplified
                    </motion.h2>
                    <motion.p
                        variants={headerVariant}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ delay: 0.1 }}
                        className="mt-2 text-muted-foreground"
                    >
                        From local book clubs to global tech conferences,
                        Voxunia helps you manage questions effortlessly.
                    </motion.p>
                </div>

                <motion.div
                    className="grid gap-5 md:grid-cols-3"
                    variants={gridVariant}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {steps.map((s) => {
                        const IconComponent = s.icon;
                        return (
                            <motion.div key={s.id} variants={cardVariant}>
                                <Card className="shadow-soft relative h-full">
                                    <p className="text-accent/60 absolute font-bricolage right-6 text-2xl md:text-3xl italic font-extrabold">
                                        {s.no}
                                    </p>
                                    <CardContent className="flex flex-col justify-center items-center space-y-4">
                                        <div className="bg-accent/60 text-accent-foreground grid h-12 w-12 place-items-center rounded-full">
                                            <IconComponent className="h-6 w-6" />
                                        </div>
                                        <h2 className="font-bold text-lg">{s.title}</h2>
                                        <p className="text-sm text-center text-muted-foreground">{s.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    )
}