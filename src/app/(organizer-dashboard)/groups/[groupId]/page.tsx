"use client"

import { Header } from "@/components/header";
import { ArrowLeft, Calendar, Plus, Settings2, Users } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { SkeletonCard } from "@/components/skeleton";
import { useGetSingleGroup } from "@/hooks/groups-hook";
import Image from "next/image";
import { use } from "react";
import { formatMonthYear } from "@/lib/utils/formatMonthYear";
import { GroupStat } from "@/components/dashboard-components/statistics-card";
import { SessionsPanel } from "@/components/dashboard-components/session-list";
import { useAuthStore } from "@/store/auth-store";


export default function SingleGroup({params} : { params: Promise<{ groupId: string }> }){
    const { groupId } = use(params);
    const user = useAuthStore((state) => state.user)


    const { data: group, isLoading } = useGetSingleGroup(groupId);
    
    if (isLoading) {
        return (
            <div className="min-h-screen">
                <Header variant="app" user={user?.name} />
                <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
                    <SkeletonCard />
                </div>
            </div>
        )
    }

    if (!group) {
        return (
            <div className="min-h-screen">
                <Header variant="app" user={user?.name} />
                <p className="p-10 text-center text-muted-foreground">Group not found.</p>
            </div>
        );
    }

  return (
    <div className="min-h-screen">
        <Header variant="app" user={user?.name} />
        <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 space-y-8">
            <Link href="/dashboard"
                className="inline-flex w-full text-sm items-center  gap-1.5 text-muted-foreground hover:text-primary transition sm:w-auto"
            >
                <ArrowLeft className="w-4 h-4"/> Back to dashboard
            </Link>

            <Card className="relative group shadow-soft transition">
                <Image
                    src={group.cover_image_url ?? "/bg-cover.jpg"}
                    alt="community-image"
                    width={200}
                    height={100}
                    priority
                    className="w-full h-50 object-cover transition duration-300 group-hover:scale-105"
                />
                <CardContent 
                    className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 p-6 sm:flex sm:flex-wrap sm:items-center sm:justify-between"
                >
                    <div className="min-w-0">
                        <h1 className="font-bricolage truncate text-2xl font-bold tracking-tight sm:text-3xl">
                            {group.name} 
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">{group.description}</p>

                        <div className="mt-4 flex items-center flex-wrap gap-3 text-muted-foreground">
                            <span className="inline-flex items-center gap-1.5">
                                <Users className="h-4 w-4" /> {group.total_attendee_count ?? 0} members
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                                <Calendar className="h-4 w-4" /> Since {formatMonthYear(group.created_at)} 
                            </span>
                        </div>
                    </div>
                     <div className="flex shrink-0 items-center gap-2">
                        <Link href={`/groups/${groupId}/edit`} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3.5 py-2 text-sm font-medium hover:bg-secondary">
                            <Settings2 className="h-4 w-4" /> Edit
                        </Link>
                        <Link href={`/groups/${groupId}/session/new`} className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft hover:brightness-105">
                            <Plus className="h-4 w-4" /> New session
                        </Link>
                    </div>
                </CardContent>
            </Card>
            <GroupStat
                totalSession={group.total_session_count}
                totalQuestions={group.total_question_count}
                totalVotes={group.total_vote_count}
                totalAttendees={group.total_attendee_count} 
            />
            <SessionsPanel params={params}/>
            
        </main>
    </div>
        
    );
}