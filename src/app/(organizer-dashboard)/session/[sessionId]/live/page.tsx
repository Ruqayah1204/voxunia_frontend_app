"use client"

import { LiveQAView } from "@/components/dashboard-components/live-session";
import { Header } from "@/components/header";
import { SkeletonCard } from "@/components/skeleton";
import { useEndSession, useSingleSession, useStartSession } from "@/hooks/session-hooks";
import { useParams } from "next/navigation";
import { SessionHeader } from "@/components/dashboard-components/session-header";
import { QRCode } from "@/components/dashboard-components/qr-code";
import { useGetQuestions } from "@/hooks/question-hook";
import { useSessionSocket } from "@/hooks/useSessionSocket";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth-store";


export default function LiveSession(){
   const { sessionId} = useParams<{sessionId : string}>();
   const queryClient = useQueryClient();
   const user = useAuthStore((state) => state.user)
   

   const { data: session, isLoading: sessionLoading } = useSingleSession(sessionId);
       const { data: questions = [], isLoading: questionsLoading } = useGetQuestions(sessionId)
   

    const { mutate:startSession, isPending:isStarting} = useStartSession(sessionId);
    const { mutate:endSession, isPending:isEnding} = useEndSession(sessionId);


    useSessionSocket(sessionId, () => {
        queryClient.invalidateQueries({ queryKey: ["questions-list", sessionId]});
        queryClient.invalidateQueries({ queryKey: ["single-session", sessionId]});
    })

    if (sessionLoading || questionsLoading) {
        return (
            <div className="min-h-screen">
                <Header variant="app" user={user?.name} />
                <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
                    <SkeletonCard />
                </main>
            </div>
        )
    }

    if (!session) {
        return (
            <div className="min-h-screen">
                <Header variant="app" user={user?.name} />
                <p className="p-10 text-center text-muted-foreground">Session not found.</p>
            </div>
        );
    }


  return (
    <div className="min-h-screen">
        <Header variant="app" user={user?.name} />
        <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 space-y-8">
            <SessionHeader
                session={session}
                stats={session.status === 'live' ? {
                    attendees: session.live_attendee_count,
                    questions: session.total_question_count,
                    votes: session.total_vote_count
                } : undefined }
                onStart={() => startSession()}
                onEnd={() => endSession()}
                isPending={isStarting || isEnding}
            />
            <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
                <LiveQAView
                    questions={questions}
                    status= {session.status}
                    onModerate={() => {}}
                />
                {session.status !== "ended" && (
                    <QRCode session={session}/>
                )}
            </div>
        </main>
    </div>
        
    );
}