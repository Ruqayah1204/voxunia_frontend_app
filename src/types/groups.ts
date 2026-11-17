export type Group = {
    id: string
    name: string
    slug: string
    description: string
    tags: string[]
    cover_image_url: string | null
    location: string | null
    virtual_link: string | null
    created_at: string
    total_session_count: number
    total_attendee_count: number 
    total_question_count: number
    total_vote_count: number

}

 