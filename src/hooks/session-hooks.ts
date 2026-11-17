import { toast } from "@/components/ui/toast"
import { sessionService } from "@/service/session-service";
import { SessionRequest } from "@/types/session";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation";


export const useCreateSession = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ group_id, data }: { group_id: string; data: SessionRequest }) =>
            sessionService.createSession(group_id, data),
        onSuccess: (_data, variables) => {
            toast.add({ type: "success", description: "New session created successfully" });
            queryClient.invalidateQueries({ queryKey: ["sessions-list"] });
            queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
            router.push(`/groups/${variables.group_id}`);
        },
        onError:(error) => {
            const message = error instanceof Error ? error.message : "Action failed";
            toast.add({ type: "error", description: message });
        }
    })
}

export const useGetSessions = (group_id: string) => {
    return useQuery({
        queryKey: ["sessions-list", group_id],
        queryFn: () => sessionService.getSessionList(group_id),
    })
}



export const useSingleSession = (session_id: string) => {
    return useQuery({
        queryKey: ["single-session", session_id],
        queryFn: () => sessionService.getSingleSession(session_id),
        enabled: !!session_id,
    })
}

export const useStartSession = (session_id: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => sessionService.startSession(session_id),
        onSuccess: () => {
            toast.add({type: "success", description: "Session is now live"});
            queryClient.invalidateQueries({queryKey: ["single-session", session_id]});
        },
        onError: (error) => {
            const message = error instanceof Error ? error.message : "Action failed";
            toast.add({ type: "error", description: message });
        }
    })
}

export const useEndSession = (session_id: string) => {
    const router = useRouter();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => sessionService.endSession(session_id),
        onSuccess: () => {
            toast.add({type: "success", description: "Session has ended"});
            queryClient.invalidateQueries({queryKey: ["single-session", session_id]});
            // redirect to the summary page after ending the session
            router.push(`/session/${session_id}/summary`)
        },
        onError: (error) => {
            const message = error instanceof Error ? error.message : "Action failed";
            toast.add({ type: "error", description: message });
        }
    })
}