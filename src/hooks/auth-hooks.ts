import { toast } from "@/components/ui/toast"
import { authService } from "@/service/auth-service"
import { useAuthStore } from "@/store/auth-store"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"


export const useLoginMutation = () => {
    const setAuth = useAuthStore((state) => state.setAuth);
    const router = useRouter();

    return useMutation({
        mutationFn: authService.login,
        onSuccess: (data) => {
            setAuth(data.user, data.access_token)
            toast.add({ type: "success", description: "Login successful..." })
            router.push('/dashboard')
        },
        onError: (error) => {
            const message = error instanceof Error ? error.message : "Login failed";
            toast.add({ type: "error", description: message });
        }
    })

}

export const useSignUpMutation = () => {
     const setAuth = useAuthStore((state) => state.setAuth);
    const router = useRouter();

    return useMutation({
        mutationFn: authService.signup,
        onSuccess: (data) => {
            console.log("Sign up successful, logging in...", data)
            setAuth(data.user, data.access_token)
            toast.add({ type: "success", description: "Signup successful..." })
            router.push('/dashboard')
        },
        onError: (error) => {
            const message = error instanceof Error ? error.message : "Signup failed";
            toast.add({ type: "error", description: message });
        },
    })
}

export const useGetDashboardStats = () => {
    return useQuery({
        queryKey: ["dashboard-stats"],
        queryFn: authService.getDashboardStats,
    });
};
