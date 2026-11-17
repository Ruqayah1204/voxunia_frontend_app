"use client"

import { Card, CardContent } from "@/components/ui/card"
import { SkeletonCard } from "../skeleton";
import Link from "next/link";
import { use } from "react";
import { Calendar } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { useGetSessions } from "@/hooks/session-hooks";
import { formatDateTime } from "@/lib/utils/formatMonthYear";

const listVariant: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
};

const itemVariant: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

export const SessionsPanel = ({ params }: { params: Promise<{ groupId: string }> }) => {
    const { groupId } = use(params);
    const { data: sessionList = [], isLoading } = useGetSessions(groupId);

    if (isLoading) {
        return (
            <div className="space-y-4">
                <SkeletonCard />
                <SkeletonCard />
            </div>
        );
    }

    const live = sessionList.filter((s) => s.status === "live");
    const upcoming = sessionList
        .filter((session) => session.status === "upcoming")
        .sort((a, b) => new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime());

    const past = sessionList
        .filter((session) => session.status === "ended")
        .sort((a, b) => new Date(b.starts_at).getTime() - new Date(a.starts_at).getTime());


    return (
        <div className="space-y-8">
            {live.length > 0 && (
                <div className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Live now
                    </p>
                    {live.map((session) => (
                        <Card key={session.id} className="border-red-500/40 bg-red-500/5 shadow-soft">
                            <CardContent className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                                <div className="space-y-1.5">
                                    <div className="flex items-center gap-2">
                                        <span className="flex items-center gap-1.5 rounded-full bg-red-500 px-2.5 py-0.5 text-xs font-semibold text-white">
                                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                                            Live
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-semibold font-bricolage">{session.title}</h3>
                                </div>
                                <Link
                                    href={`/session/${session.id}/live`}
                                    className="inline-flex items-center gap-1 text-sm font-semibold text-red-600 hover:underline"
                                >
                                    Go to live view →
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
            {upcoming.length > 0 && (
                <div className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Upcoming
                    </p>
                    <motion.div initial="hidden" animate="show" variants={itemVariant} className="space-y-3">
                        {upcoming.map((session) => (
                            <Card key={session.id} className="group cursor-pointer border-primary/30 bg-primary/5 shadow-soft transition hover:bg-primary/10">
                                <CardContent className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="space-y-1.5">
                                        <div className="flex items-center gap-2">
                                            <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
                                                code: {session.join_code}
                                            </span>
                                            <span className="text-xs text-muted-foreground">
                                                {formatDateTime(session.starts_at)}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-semibold font-bricolage">
                                            {session.title}
                                        </h3>
                                    </div>
                                    <Link
                                        href={`/session/${session.id}/live`}
                                        className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                                    >
                                        Open session →
                                    </Link>
                                </CardContent>
                            </Card>
                        ))}
                    </motion.div>
                </div>
            )}

            <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Past sessions
                </p>

                {past.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No past sessions yet.</p>
                ) : (
                    <motion.div
                        variants={listVariant}
                        initial="hidden"
                        animate="show"
                        className="divide-y divide-border rounded-2xl border border-border bg-card shadow-soft"
                    >
                        {past.map((session) => (
                            <motion.div key={session.id} variants={itemVariant}>
                                <Link
                                    href={`/session/${session.id}/summary`}
                                    className="flex items-center justify-between gap-4 px-5 py-4 transition hover:bg-secondary/50"
                                >
                                    <div className="space-y-1">
                                        <h4 className="font-semibold">{session.title}</h4>
                                        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                            <Calendar className="h-3.5 w-3.5" />
                                            {formatDateTime(session.starts_at)}
                                        </p>
                                    </div>
                                    <div className="flex shrink-0 items-center gap-4 text-sm text-muted-foreground">
                                        <span>{formatDateTime(session.ends_at)}</span>
                                        {/* <span>78 votes</span> */}
                                        {/* <span>80 Qs</span>
                                        <span>78 votes</span> */}
                                        {/* <span>{session.question_count ?? "—"} Qs</span>
                                        <span>{session.vote_count ?? "—"} votes</span> */}
                                    </div>
                                </Link>

                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
};
