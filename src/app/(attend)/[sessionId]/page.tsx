"use client"

import { AttendeeLiveSession } from "@/components/attendee-qa";
import { Header } from "@/components/header";
import { SkeletonCard } from "@/components/skeleton";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { useGetAttendeeSession } from "@/hooks/attendee-hooks";
import { useGetQuestions, usePostQuestions } from "@/hooks/question-hook";
import { useSessionSocket } from "@/hooks/useSessionSocket";
import { attendeeSession } from "@/lib/attendee-session";
import { useQueryClient } from "@tanstack/react-query";
import { LoaderCircle, Plus, Send, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";


export default function AttendeeLivePage({params} : { params: Promise<{ sessionId: string }> }){
    const { sessionId } = use(params);
    const router = useRouter();
    const queryClient = useQueryClient();
    const token = attendeeSession.getToken(sessionId);
   
    const [open, setOpen] = useState(false);
    const [draft, setDraft] = useState("");
    
    useEffect(() => {
        if(!token) {
            toast.add({title:"Session expired. Try to join again",
                actionProps: {
                    onClick() {
                    toast.close()
                    },
                },
            });
            router.push(`/?focus=join-session`) //go back to landing page and highlight the code field
        }
    },[token, router]);

    const { data: session, isLoading: sessionLoading } = useGetAttendeeSession(sessionId, token || "");
    const { data: questions = [], isLoading: questionsLoading } = useGetQuestions(sessionId)
    const {mutate, isPending} = usePostQuestions();

    useSessionSocket(sessionId, () => {
        queryClient.invalidateQueries({ queryKey: ["questions-list", sessionId]});
        queryClient.invalidateQueries({ queryKey: ["attendee-session", sessionId, token || ""]});
    })

    const handleSubmit = () => {
        if(!draft.trim()) return;
        mutate({
            session_id: sessionId,
            body: draft,
            attendee_token: token || ""
        },{
            onSuccess: () => {
                setDraft("")
                setOpen(false);
            }
        })
    }
    
    if (sessionLoading || questionsLoading) {
        return (
            <div className="min-h-screen">
                <Header variant="app" />
                <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
                    <SkeletonCard />
                </main>
            </div>
        )
    }
    
    if (!session) {
        return (
            <div className="min-h-screen">
                <Header variant="app" />
                <p className="p-10 text-center text-muted-foreground">Session not found.</p>
            </div>
        );
    }

    if (session.status === "ended") {
    return (
        <div className="min-h-screen">
            <Header variant="attendee" />
            <main className="mx-auto max-w-xl px-4 py-16 text-center space-y-4">
                <h1 className="text-2xl font-bold font-bricolage">This session has ended</h1>
                <p className="text-muted-foreground">
                    Thanks for taking part in {session.title}.
                </p>
                <Button
                    onClick={() => {
                        attendeeSession.clearToken(sessionId);
                        router.push("/");
                    }}
                    className="rounded-full"
                >
                    Back to home
                </Button>
            </main>
        </div>
    );
}

  return (
    <div className="min-h-screen">
        <Header variant="attendee" />
        <main className="mx-auto max-w-xl px-4 py-10 sm:px-6 space-y-8">
            <div className="mx-auto flex max-w-xl items-center justify-between gap-3 px-4 py-3">
                <div className="min-w-0">
                    <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-primary">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" /> {session.status} · {session.join_code}
                    </p>
                    <h1 className="mt-0.5 truncate text-base font-bold">{session.title}</h1>
                </div>
            </div>

            <AttendeeLiveSession questions={questions} sessionId={sessionId} />
        </main>

        {!open ? (
            <Button
                className="fixed bottom-6 z-30 left-1/2 -translate-x-1/2  "
                onClick={() => setOpen(true)}
            >
                <Plus className="h-4 w-4" /> Ask a question
            </Button>
        ): (
            <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border gb-background/95 p-4 shadow-lift backdrop-blur">
                <div className="mx-auto max-w-xl">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="question" className="font-semibold">Your question</Label>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground inline-flex items-center" onClick={() => setOpen(false)}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                    <Textarea 
                        id="question" 
                        autoFocus rows={3}
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        placeholder="Type your question"
                        className="mt-2 resize-none"
                    />
                    <Button
                        onClick={handleSubmit}
                        disabled={!draft.trim()}
                        className="mt-2 font-semibold disabled:opacity-50 inline-flex items-center" 
                    >
                        {isPending ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />} Post
                    </Button>
                </div>


            </div>
        )}
    </div>
    );
}