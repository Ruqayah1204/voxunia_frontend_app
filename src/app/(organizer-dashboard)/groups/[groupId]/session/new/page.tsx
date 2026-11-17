"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateSession } from "@/hooks/session-hooks";
import { combineDateAndTime } from "@/lib/utils/formatRelativeTime";
import { CreateSessionFormData, createSessionSchema } from "@/schema/sessionSchema";
import { useAuthStore } from "@/store/auth-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Globe, Lock } from "lucide-react"
import Link from "next/link"
import { use, useState } from "react";
import { useForm } from "react-hook-form";

export default function SessionForm({params} : { params: Promise<{ groupId: string }>}){
    const { groupId } = use(params);
    const [visibility, setVisibility] = useState<"public" | "private">("public")
    const {mutate, isPending} = useCreateSession();
    const user = useAuthStore((state) => state.user)
    
    
    const {register, handleSubmit, formState: {errors}} = useForm<CreateSessionFormData>({
        resolver: zodResolver(createSessionSchema),
    })

    const onSubmit = (data: CreateSessionFormData) => {
        const starts_at = combineDateAndTime(data.date, data.time);
        mutate({
            group_id: groupId,
            data: {
                title: data.title,
                visibility,
                starts_at, 
            }
        })
    }

    return (
        <div className="min-h-screen">
            <Header variant="app" user={user?.name} />
            <main className="mx-auto max-w-2xl py-10 px-4 sm:px-6">
                <Link href={`/groups/${groupId}`}
                    className="inline-flex w-full items-center  gap-2 rounded-full text-muted-foreground hover:text-primary transition sm:w-auto"
                >
                    <ArrowLeft className="w-4 h-4"/> Back
                </Link>
                <h1 className="mt-8 text-3xl font-bold tracking-tight font-bricolage">Start a new session</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Configure your live Q&A session. Share the code when you&apos;re ready to go live.
                </p>
                <form 
                    className="mt-8 space-y-6 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-7"
                    onSubmit={handleSubmit(onSubmit)}
                >

                    {/* Session name */}
                    <div className="space-y-2">
                        <Label htmlFor="title" className=" font-semibold uppercase tracking-wide text-muted-foreground">
                            session title
                        </Label>
                        <Input
                            {...register("title")}
                            id="title"
                            placeholder="Monthly Meetup #15"
                            className="bg-background h-10 p-4"
                        />
                        {errors.title && <p className="text-xs text-red-600">{errors.title.message}</p>}
                    </div>

                    {/* Date & Time */}
                    <div className="grid sm:grid-cols-2 gap-4 space-y-3 sm:space-y-0">
                        <div className="space-y-2">
                            <Label htmlFor="date" className=" font-semibold uppercase tracking-wide text-muted-foreground">
                                Date
                            </Label>
                            <div>
                                <Input
                                    {...register("date")}
                                    type="date"
                                    id="date"
                                    placeholder="mm/dd/yy"
                                    className="bg-background h-10 p-4"
                                />
                            </div>
                            {errors.date && <p className="text-xs text-red-600">{errors.date.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="time" className=" font-semibold uppercase tracking-wide text-muted-foreground">
                                Time
                            </Label>
                            <div>
                                <Input
                                    {...register("time")}
                                    type="time"
                                    id="time"
                                    placeholder=""
                                    className="bg-background h-10 p-4"
                                />
                            </div>
                            {errors.time && <p className="text-xs text-red-600">{errors.time.message}</p>}
                        </div>
                    </div>

                    {/* visibility */}
                    <div className="space-y-3">
                        <Label htmlFor="visibility" className=" font-semibold uppercase tracking-wide text-muted-foreground">
                            Visibility
                        </Label>
                        <div className="grid gap-3 sm:grid-cols-2">
                            {([
                                { val: "public", icon: Globe, title: "Public", desc: "Anyone with the code or link can join." },
                                { val: "private", icon: Lock, title: "Private", desc: "Only people you invite can join." },
                            ] as const).map((i) => (
                                <Button
                                    type="button"
                                    key={i.val}
                                    onClick={() => setVisibility(i.val)}
                                    className={`h-auto flex items-start justify-start gap-3 rounded-xl border p-4 text-left transition hover:bg-accent ${visibility === i.val ? "border-primary bg-primary/10 shadow-soft" : "border-border bg-background hover:bg-secondary"}`}
                                >
                                    <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${visibility === i.val ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"}`}>
                                        <i.icon className="h-4 w-4" />
                                    </span>
                                    <span className="min-w-0">
                                        <span className="block text-sm font-semibold text-foreground">{i.title}</span>
                                        <span className="mt-0.5 block text-xs text-muted-foreground">{i.desc}</span>
                                    </span>
                                </Button>
                            ))}
                        </div>
                    </div>
                    

                    
                    <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end items-center pt-3 border-t border-border">
                        <Link href="/dashboard"
                            className="w-full sm:w-auto text-center rounded-full font-semibold text-sm border border-border bg-background px-4 py-2 transition hover:bg-secondary"
                        >
                            Cancel
                        </Link>
                        <Button type="submit" className="w-full sm:w-auto font-semibold rounded-full py-4.5 px-4" disabled={isPending}>
                            {isPending ? "loading..." : "Create new session"} 
                        </Button>
                    </div>
                </form>

            </main>
        </div>
    )
}