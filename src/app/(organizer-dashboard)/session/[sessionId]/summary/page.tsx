"use client"

import { Header } from "@/components/header";
import { SkeletonCard } from "@/components/skeleton";
import { useSingleSession } from "@/hooks/session-hooks";
import { useParams } from "next/navigation";
import { SessionHeader } from "@/components/dashboard-components/session-header";
import { useGetQuestions } from "@/hooks/question-hook";
import { ChartNoAxesColumn } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";


export default function Summary(){
   const { sessionId} = useParams<{sessionId : string}>();
   const user = useAuthStore((state) => state.user)
   

   const { data: session, isLoading: sessionLoading } = useSingleSession(sessionId);
   const { data: questions = [], isLoading: questionsLoading } = useGetQuestions(sessionId)
   

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
                endInfo={session.status === 'ended' ? {
                    start_at: session.starts_at,
                    end_at: session.ends_at
                } : undefined }

            />
            <div className="mt-8">
                <div className="flex justify-between gap-4 mb-4">
                    <h2 className="text-lg font-semibold font-bricolage">Top questions by votes</h2>
                    <div className="flex items-center gap-1 text-muted-foreground text-xs">
                        <ChartNoAxesColumn className="h-3 w-3" />
                        Ranked by vote count
                    </div>
                </div>

                <div className="space-y-4">
                    {/* fetch just up to 5 top question with highest vote count */}
                    {questions.slice(0, 5).map((question, index) => (
                        <Card key={question.id} className={cn("shadow-soft", {
                            "opacity-50": question.status === "hidden",
                            "bg-primary/5 ring-primary/40": question.status === "answered"
                        })}>
                            <CardContent className="flex gap-4 items-start">
                                <div>
                                    {/* rank position  by highest vote */}
                                    <span className="text-sm font-semibold text-primary">#{index + 1}</span>
                                </div>
                                <div className="flex shrink-0 flex-col justify-center items-center  px-3">
                                    <p className="text-xl font-semibold text-primary ">{question.vote_score}</p>
                                    <span className="block text-xs font-normal">votes</span>
                                </div>
                                <div className=" space-y-2">
                                    
                                    <p className="font-semibold font-bricolage">
                                        {question.body}
                                    </p>
                                    <p className="text-sm text-muted-foreground"> by {question.display_name}</p>
                                </div>
                                    
                                {/* </div> */}
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* <LiveQAView
                    questions={questions}
                    status= {session.status}
                    onModerate={() => {}}
                /> */}
            </div>
        </main>
    </div>
        
    );
}