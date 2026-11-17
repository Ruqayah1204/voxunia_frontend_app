import { apiFetch } from "@/lib/api-client";
import { attendeeSession } from "@/lib/attendee-session";
import { Question } from "@/types/questions";


export const questionService = {
    postQuestion: async (session_id: string, body: string, attendee_token: string) => {
        await apiFetch(`/sessions/${session_id}/questions`, {
            method: "POST",
            headers: {
                'x-attendee-token': attendee_token
            },
            body: JSON.stringify({body}),
        });

    },
    getQuestions: async (session_id: string): Promise<Question[]> => {
        return apiFetch<Question[]>(`/sessions/${session_id}/questions`, {
            method: "GET",
            headers: {
                'x-attendee-token': attendeeSession.getToken(session_id) || ""
            }
        });

    },
    voteQuestion: async (question_id: string, value: number, attendee_token: string) => {
        await apiFetch(`/questions/${question_id}/vote`, {
            method: "POST",
            headers: {
                'x-attendee-token': attendee_token
            },
            body: JSON.stringify({value}),
        })
    }

};
