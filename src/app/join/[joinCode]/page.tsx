"use client"

import { Header } from "@/components/header";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import React, { use, useState } from "react";
import { useGetSessionPreview, useJoinSession } from "@/hooks/attendee-hooks";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SkeletonCard } from "@/components/skeleton";
import { attendeeSession } from "@/lib/attendee-session";
import { useRouter } from "next/navigation";
import { useSessionSocket } from "@/hooks/useSessionSocket";
import { useQueryClient } from "@tanstack/react-query";


export default function AttendeeJoinPreviewPage({params} : { params: Promise<{ joinCode: string }> }){
    const { joinCode } = use(params);
    const router = useRouter();
    const queryClient = useQueryClient();
    
    const [displayName, setDisplayName] = useState("");

    const {data:previewInfo, isLoading, isError} = useGetSessionPreview(joinCode)
    const {mutate, isPending} = useJoinSession();


    const handleJoin = (e: React.SubmitEvent) => {
        e.preventDefault()
        if(!previewInfo?.session_id) return;

        const existingToken = attendeeSession.getToken(previewInfo.session_id)
        if(existingToken) {
            router.push(`/${previewInfo.session_id}`);
            return;
        }

        mutate({
            session_id: previewInfo?.session_id, 
            display_name: displayName.trim()  || "Anonymous"
        })
        
    }

    useSessionSocket(previewInfo?.session_id ?? "", () => {
        queryClient.invalidateQueries({ queryKey: ["session_preview", joinCode]});
    })

    if (isLoading) {
        return (
            <div className="min-h-screen">
                <Header/>
                <div className="my-auto mt-6">
                    <Card className="mx-auto max-w-md px-4 py-10 sm:px-6">
                        <SkeletonCard />
                    </Card>
                </div>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-linear-to-b from-background to-accent/40">
                <Header/>
                <div className="mx-auto flex min-h-screen max-w-md flex-col px-4 py-10 md:px-0">
                    <Card className="w-full bg-transparent text-center">
                        <CardHeader>
                            <p className="text-2xl font-extrabold">Session not found</p>
                            <CardDescription>
                                We couldn&apos;t find a session with the code{" "}
                                <span className="font-semibold text-foreground">{joinCode}</span>
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <Button className="w-full rounded-full">
                                <Link href="/">Back to home</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }
    
    const isEnded = previewInfo?.status === "ended"
    const isUpcoming = previewInfo?.status === "upcoming"

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-accent/40">
        <div className="mx-auto flex flex-col min-h-screen max-w-md px-4 py-10 md:px-0">
            <Link href="/" className="mb-8">
            <Image
                src="/voxunia-logo1.png"
                alt="voxunia-logo"
                width={200}
                height={50}
                priority
            />
            </Link>
            <div className="my-auto">
                <Link href="/"
                    className="inline-flex w-full text-sm items-center gap-1.5 text-muted-foreground hover:text-primary transition"
                >
                    <ArrowLeft className="w-4 h-4"/> Back to home
                </Link>

                <Card className="w-full bg-transparent ring-0 space-y-4">
                    <CardHeader>
                        {previewInfo?.status === "live" ? (
                            <p className="text-sm font-semibold uppercase tracking-wide text-primary">Live now </p>
                        ) : previewInfo?.status === "upcoming" ? (
                            <p className="text-sm font-semibold uppercase tracking-wide text-primary">Live soon</p>
                        ) : (
                            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Session ended</p>
                        )}
                        <CardTitle className="mt-1 text-3xl font-extrabold font-bricolage tracking-tight">{previewInfo?.title}</CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">{previewInfo?.live_attendee_count} attendees</CardDescription>
                    </CardHeader>
                    <CardContent className="" >
                        <form className="space-y-6" onSubmit={handleJoin}>
                            <div className="space-y-2">
                                <Label htmlFor="code" className="font-semibold">
                                    Session code
                                </Label>
                                <Input
                                    id="code"
                                    value={joinCode}
                                    className="bg-muted h-12 p-4 text-center tracking-wider text-muted-foreground"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="display_name" className="flex items-center justify-between">
                                    <span className="text-sm font-semibold">Display Name</span>
                                    <span className="text-xs text-muted-foreground">Optional</span>
                                </Label>
                                <Input
                                    id="display_name"
                                    placeholder="Leave blank to stay anonymous"
                                    className="bg-background h-12 p-4"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                />
                            </div>
                            <Button type="submit" className="w-full font-semibold rounded-full py-5 px-4" 
                                disabled={isPending || isUpcoming || isEnded}
                            >
                                {isPending ? "Joining..." : isEnded ? "Session has ended" : isUpcoming ? "Not started yet" : "Join session"} 
                            </Button>
                        </form>
                        <p className="mt-4 text-center text-xs text-muted-foreground md:px-4">
                            No account needed. Your questions are anonymous unless you enter a name.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
    );
}