import { PowerOff, CirclePlay } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SessionList } from "@/types/session";
import { formatEndSessionDate } from "@/lib/utils/formatMonthYear";

interface SessionHeaderProps {
    session: SessionList;
    stats?: { attendees: number; questions: number; votes: number };
    endInfo?: {start_at: string; end_at: string};
    onStart?: () => void;
    onEnd?: () => void;
    isPending?: boolean;
}

export const SessionHeader = ({ session, stats, endInfo, onStart, onEnd, isPending }: SessionHeaderProps) => {
    const isLive = session.status === "live";
    const isUpcoming = session.status === "upcoming";
    const isEnded = session.status === "ended";

    return (
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:flex-wrap sm:justify-between">
            <div className="min-w-0">
                <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        isLive ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                    }`}
                >
                    {isLive && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />}
                    {isLive ? "LIVE" : isEnded ? "SESSION ENDED" : "UPCOMING"}
                </span>

                <h1 className="mt-1 truncate text-2xl font-semibold font-bricolage tracking-tight sm:text-3xl">
                    {session.title}
                </h1>
                {stats && (
                    <p className="mt-1 text-sm text-muted-foreground">
                        {session.live_attendee_count} attendees · {session.total_question_count} questions · {session.total_vote_count} votes
                    </p>
                )}
                {endInfo && (
                    <p className="mt-1 text-sm text-muted-foreground">
                        {/* Jul 27, 2025 · 7:00PM - 8:34PM · 94 minutes */}
                        {formatEndSessionDate(endInfo.start_at, endInfo.end_at)}
                    </p>
                )}
            </div>

            {isUpcoming && (
                <Button
                    className="inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
                    onClick={onStart}
                    disabled={isPending}
                >
                    <CirclePlay className="h-4 w-4" /> {isPending ? "Starting..." : "Start session"}
                </Button>
            )}

            {isLive && (
                <Button
                    variant="outline"
                    className="inline-flex shrink-0 items-center gap-2 rounded-full border border-destructive/30 bg-background px-4 py-2 text-sm font-semibold text-destructive hover:bg-destructive/10 transition"
                    onClick={onEnd}
                    disabled={isPending}
                >
                    <PowerOff className="h-4 w-4" /> {isPending ? "Ending..." : "End session"}
                </Button>
            )}
        </div>
    );
};