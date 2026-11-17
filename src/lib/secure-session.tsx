const KEYS = {
    ACCESS_TOKEN: "ss_access_token",
    USER: "ss_user",
} as const;

const isBrowser = typeof window !== "undefined";

export const secureSession = {
    setAccessToken: (access_token: string) => {
        if (!isBrowser) return;
        sessionStorage.setItem(KEYS.ACCESS_TOKEN, access_token);
    },
    getAccessToken: () => {
        if (!isBrowser) return null;
        return sessionStorage.getItem(KEYS.ACCESS_TOKEN);
    },
    setUser: (user: object) => {
        if (!isBrowser) return;
        sessionStorage.setItem(KEYS.USER, JSON.stringify(user));
    },
    getUser: () => {
        if (!isBrowser) return null;
        const user = sessionStorage.getItem(KEYS.USER);
        return user ? JSON.parse(user) : null;
    },
    clearSession: () => {
        if (!isBrowser) return;
        sessionStorage.removeItem(KEYS.ACCESS_TOKEN);
        sessionStorage.removeItem(KEYS.USER);
    },
};