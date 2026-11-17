"use client"

import { useState } from "react";
import { copyClipboard } from "@/lib/utils/formatRelativeTime"
import { SessionList } from "@/types/session"
import { Copy, Check } from "lucide-react"
import { QRCodeSVG } from "qrcode.react"

export const QRCode = ({ session }: { session: SessionList }) => {
    const joinURL = `${process.env.NEXT_PUBLIC_SITE_URL}/join/${session.join_code}`;
    const [copiedField, setCopiedField] = useState<"code" | "link" | null>(null);

    const handleCopy = (value: string, field: "code" | "link") => {
        copyClipboard(value);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    };

    return (
        <aside className="rounded-3xl border border-border bg-card p-6 shadow-soft lg:sticky lg:top-24 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Join code
            </p>

            <button
                type="button"
                onClick={() => handleCopy(session.join_code, "code")}
                className="group mt-1 flex items-center gap-2"
            >
                <span className="text-3xl font-bold tracking-widest font-bricolage">
                    {session.join_code}
                </span>
                <span className="flex items-center gap-1 opacity-0 transition group-hover:opacity-100">
                    {copiedField === "code" ? (
                        <>
                            <Check className="h-4 w-4 text-primary" />
                            <span className="text-xs font-medium text-primary">Copied!</span>
                        </>
                    ) : (
                        <Copy className="h-4 w-4 text-muted-foreground" />
                    )}
                </span>
            </button>

            <div className="mt-6 flex items-center justify-center rounded-2xl bg-muted/70 p-6">
                <QRCodeSVG value={joinURL} size={180} />
            </div>

            <button
                type="button"
                onClick={() => handleCopy(joinURL, "link")}
                className="group mt-3 flex w-full items-center justify-center gap-1.5"
            >
                <span className="truncate text-center text-xs tracking-wide text-muted-foreground">
                    {joinURL}
                </span>
                {copiedField === "link" ? (
                    <Check className="h-3.5 w-3.5 shrink-0 text-primary" />
                ) : (
                    <Copy className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition group-hover:opacity-100" />
                )}
            </button>
        </aside>
    );
};