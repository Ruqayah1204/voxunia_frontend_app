import { toast } from "@/components/ui/toast"
import { attendeeSession } from "@/lib/attendee-session"
import { sessionService } from "@/service/session-service"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"



export const useGetSessionPreview = (join_code: string) => {
    return useQuery({
        queryKey: ["session_preview", join_code],
        queryFn: () => sessionService.joinCodePreview(join_code),
    })
}

export const useJoinSession = () => {
    const router = useRouter();
    
    return useMutation({
        mutationFn: ({session_id, display_name}:{session_id: string, display_name: string}) => 
            sessionService.joinSession(session_id, display_name),
        onSuccess: (data) => {
            attendeeSession.setToken(data.session_id, data.attendee_token);
            router.push(`/${data.session_id}`)
        },
        onError:(error) => {
            const message = error instanceof Error ? error.message : "Action failed";
            toast.add({ type: "error", description: message });
        }
    })
}

export const useGetAttendeeSession = (session_id: string, attendee_token: string) => {
    return useQuery({
        queryKey: ["attendee-session", session_id, attendee_token],
        queryFn: () => sessionService.getAttendeeSession(session_id, attendee_token),
        enabled: !!session_id && !!attendee_token,
    })
}

