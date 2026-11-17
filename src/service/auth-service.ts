import { apiFetch } from "@/lib/api-client";
import { DashboardStats, LoginRequest, LoginResponse, SignUpRequest, User } from "@/types";


export const authService = {
    signup: async (formData: SignUpRequest): Promise<LoginResponse> => {
        await apiFetch<User>("/auth/signup", {
            method: "POST",
            body: JSON.stringify(formData),
        });

        //immediately log in right after signup
        return authService.login({ email: formData.email, password: formData.password });
    },

    login: async (formData: LoginRequest): Promise<LoginResponse> => {
        return apiFetch<LoginResponse>("/auth/login", {
            method: "POST",
            body: JSON.stringify(formData),
        });
    },

    getDashboardStats: async (): Promise<DashboardStats> => {
        return apiFetch<DashboardStats>("/dashboard/stats");
    },
};
