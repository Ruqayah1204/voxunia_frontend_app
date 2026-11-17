import { apiFetch } from "@/lib/api-client";
import { SessionRequest, SessionList, JoinSessionPreview, JoinSession} from "@/types/session";


export const sessionService = {
    createSession: async (group_id: string, data: SessionRequest) => {
        await apiFetch(`/groups/${group_id}/sessions`, {
            method: "POST",
            body: JSON.stringify(data),
        });

    },

    getSessionList: async (group_id: string): Promise<SessionList[]> => {
        return apiFetch<SessionList[]>(`/groups/${group_id}/sessions`, {
            method: "GET",
        });
    },

    getSingleSession: async (session_id: string): Promise<SessionList> => {
        return apiFetch<SessionList>(`/sessions/${session_id}`, {
            method: "GET",
        });
    },

    startSession: async (session_id: string): Promise<SessionList> => {
        return apiFetch<SessionList>(`/sessions/${session_id}/start`, {
            method: 'PATCH',
        })
    },

    endSession: async (session_id: string): Promise<SessionList> => {
        return apiFetch<SessionList>(`/sessions/${session_id}/end`, {
            method: 'PATCH',
        })
    },

    // ATTENDEE API 
    joinCodePreview: async(join_code: string): Promise<JoinSessionPreview> => {
        return apiFetch<JoinSessionPreview>(`/sessions/preview/${join_code}`, {
            method: 'GET',
        })
    },

    joinSession: async(session_id: string, display_name: string): Promise<JoinSession> => {
        return apiFetch<JoinSession>(`/sessions/${session_id}/join`, {
            method: 'POST',
            body: JSON.stringify({display_name})
        })
    },

    getAttendeeSession: async(session_id: string, attendee_token: string) : Promise<SessionList> => {
        return apiFetch<SessionList>(`/sessions/${session_id}`, {
            method: 'GET',
            headers: {
                'x-attendee-token': attendee_token
            }
        });
    },
    
};



