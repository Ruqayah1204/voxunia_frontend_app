export type SignUpRequest = {
    name: string
    email: string
    password: string
}

export type LoginRequest = {
    email: string
    password: string
}

export type LoginResponse = {
    access_token: string
    token_type: string
    user: User
}

export type User = {
    id: string
    name: string
    email: string
    role: string
}

export type DashboardStats = {
    total_group_count: number
    total_session_count: number
    total_attendee_count: number
    total_question_count: number
}

