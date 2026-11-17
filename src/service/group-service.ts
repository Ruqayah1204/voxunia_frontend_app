import { apiFetch } from "@/lib/api-client";
import { CreateGroupFormData } from "@/schema/groupSchema";
import { Group } from "@/types/groups";


export const groupService = {
    createGroup: async (data: CreateGroupFormData) => {
        await apiFetch("/groups", {
            method: "POST",
            body: JSON.stringify(data),
        });

    },

    getGroupList: async (): Promise<Group[]> => {
        return apiFetch<Group[]>("/groups", {
            method: "GET",
        });
    },

    getSingleGroup: async (id: string): Promise<Group> => {
        return apiFetch<Group>(`/groups/${id}`, {
            method: "GET",
        });
    },

};
