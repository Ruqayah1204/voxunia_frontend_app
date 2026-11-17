import { secureSession } from "@/lib/secure-session";
import { User } from "@/types";
import { create } from "zustand";

interface AuthState {
    user:  User | null
    access_token: string | null
    isLoading: boolean
    isAuthenticated: boolean
}

interface AuthStore extends AuthState {
    setAuth: (user: User, access_token: string) => void
    // setAccessToken: (access_token: string) => void
    logout: () => void
    setIsLoading: (loading:boolean) => void
    restoreSession: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    access_token: null,
    isAuthenticated: false,
    isLoading: true,

    setAuth: (user, access_token) => {
        secureSession.setAccessToken(access_token);
        secureSession.setUser(user);
        set({user, access_token, isAuthenticated: true, isLoading: false});
    },

    logout: () => {
        secureSession.clearSession();
        set({user: null, access_token: null, isAuthenticated: false, isLoading: false})
    },

    setIsLoading: (loading) => set({isLoading: loading}),

    restoreSession: () => {
        const user = secureSession.getUser();
        const token = secureSession.getAccessToken();
        set({
            user,
            access_token: token,
            isAuthenticated: !!token,
            isLoading: false,
        });
    }
    
}))