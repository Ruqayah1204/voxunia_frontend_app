const ATTENDEE_KEY = "voxunia-attendee"

const isBrowser = typeof window !== "undefined";



export const attendeeSession = {
    getToken: (sessionId: string): string | null => {
        if(!isBrowser) return null;
        return sessionStorage.getItem(`${ATTENDEE_KEY}${sessionId}`);
    },
    setToken: (sessionId: string, attendee_token: string) => {
        if(!isBrowser) return;
        sessionStorage.setItem(`${ATTENDEE_KEY}${sessionId}`, attendee_token);
    },
    clearToken: (sessionId: string) => {
        if(!isBrowser) return;
        sessionStorage.removeItem(`${ATTENDEE_KEY}${sessionId}`);
    }
}