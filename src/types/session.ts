export type SessionList = {
    id: string
    group_id: string
    title: string
    join_code: string
    status: "upcoming" | "live" | "ended"
    visibility: "private" | "public"
    starts_at: string
    ends_at: string
    live_attendee_count: number,
    total_question_count: number,
    total_vote_count: number
}


export type SessionRequest = {
    title: string
    visibility: "private" | "public"
    starts_at: string
}

export type PreviewSession = {
    session_id: string
    title: string
    status: string
    live_attendee_count: number
}

export type JoinSession = {
    attendee_token: string
    session_id: string
    display_name: string
}

export type JoinSessionPreview = {
    session_id: string
    title: string
    status: "upcoming" | "live" | "ended"
    live_attendee_count: number| null
}