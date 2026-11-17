

export type Question = {
    id: string
    body: string
    vote_score: number
    status: "visible" | "hidden" | "answered"
    display_name: string
    created_at: string
    my_vote: number
}
