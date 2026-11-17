import { toast } from "@/components/ui/toast"
import { groupService } from "@/service/group-service"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation";


export const useCreateGroup = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: groupService.createGroup,
        onSuccess: () => {
            console.log("Group created successfully")
            toast.add({ type: "success", description: "New group created successfully" })
            queryClient.invalidateQueries({ queryKey:["group-list"]});
            queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
            router.push('/dashboard')
        },
        onError:(error) => {
            const message = error instanceof Error ? error.message : "Action failed";
            toast.add({ type: "error", description: message });
        }
        
    })
}

export const useGetGroup = () => {
    return useQuery({
        queryKey: ["group-list"],
        queryFn: groupService.getGroupList,
    })
}

export const useGetSingleGroup = (id: string) => {
    return useQuery({
        queryKey: ["single-group-list", id],
        queryFn: () => groupService.getSingleGroup(id),
        enabled: !!id,
    })
}