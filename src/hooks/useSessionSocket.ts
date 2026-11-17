"use client"

import {useEffect, useRef} from "react";

type SocketMessage = 
    | { type: "new_question"; question: unknown }
    | { type: "vote_update"; question_id: string; vote_score: number }
    | { type: "new_comment"; question_id: string; comment: unknown }
    | { type: "edit_question"; question_id: string; status: string }
    | { type: "session_started"}
    | { type: "session_ended"}

export function useSessionSocket(sessionId: string, onMessage:(msg: SocketMessage) => void) {
    const wsRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        if(!sessionId) return;

        const wsURL = `${process.env.NEXT_PUBLIC_WS_URL}/ws/sessions/${sessionId}`;
        const ws = new WebSocket(wsURL);
        wsRef.current = ws;

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data) as SocketMessage;
                onMessage(data);
            } catch(err) {
                console.error("Failed to parse WebSocket message:", err);
            }
        };

        ws.onerror = (err) => {
            console.error("WebSocket error:", err);
        }

        return () => {
            ws.close();
        };
    }, [sessionId, onMessage]);

    return wsRef;
}