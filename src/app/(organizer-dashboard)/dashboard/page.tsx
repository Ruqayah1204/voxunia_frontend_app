"use client"

import { GroupList } from "@/components/dashboard-components/group-list";
import { Stats } from "@/components/dashboard-components/statistics-card";
import { Header } from "@/components/header";
import { useGetDashboardStats } from "@/hooks/auth-hooks";
import { useAuthStore } from "@/store/auth-store";
import { Plus } from "lucide-react";
import Link from "next/link";


export default function Dashboard() {

  const user = useAuthStore((state) => state.user)
  const {data: stats} = useGetDashboardStats();

  return (
    <div className="min-h-screen">
        <Header variant="app" user={user?.name} />
        <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 space-y-8">
          <section className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:flex-wrap sm:justify-between">
            <div className="min-w-0">
              <h1 className="font-extrabold font-bricolage text-2xl sm:text-3xl truncate tracking-tight">Your community groups</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Create groups for recurring meetups. Each group can host many sessions.
              </p>
            </div>
            <Link href="/groups/new"
              className="inline-flex w-full items-center justify-center gap-1 rounded-full text-primary-foreground bg-primary px-4 py-2 shadow-lift transition hover:brightness-105 sm:w-auto"
            >
              <Plus className="w-5 h-5"/>New group
            </Link>
          </section>
            <Stats
              totalGroup={stats?.total_group_count ?? 0}
              totalSession={stats?.total_session_count ?? 0}
              totalQuestions={stats?.total_question_count ?? 0}
              totalAttendees={stats?.total_attendee_count ?? 0}
            />
            <GroupList/>
        </main>
    </div>
        
    );
}