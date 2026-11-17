import { useAuthStore } from "@/store/auth-store";
import { secureSession } from "./secure-session";

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function apiFetch<T>(
    path: string,
    options: RequestInit = {}
): Promise<T> {
    
    const token = secureSession.getAccessToken();

    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(token ? {Authorization: `Bearer ${token}`} : {}),
            ...options.headers,
        },
    });

    if(response.status === 401 && token ) {
        useAuthStore.getState().logout();

        if(typeof window !== "undefined") {
            // window.location.href = "/login"
        }
        throw new Error("Session expired. Please login again")
    }

    if (!response.ok){
        const error = await response.json().catch(()=> ({details: "Something went wrong"}));
        throw new Error(error.detail || "Request failed");
    }

    return response.json();
}