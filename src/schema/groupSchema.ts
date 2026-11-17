import { z } from "zod";


export const createGroupSchema = z.object({
    name: z.string().min(2, "Group name is required"),
    description: z.string().max(280, "Description must be 280 characters or less").optional(),
    tags: z.array(z.string()).min(1, "Add at least one tag").max(3, "Pick up to 3 tags"),
    cover_image_url: z.string().optional(),
    // cover_image_url: z.instanceof(File).optional(),
    location: z.string().optional(),
    virtual_link: z.string().optional(),
})

export type CreateGroupFormData = z.infer<typeof createGroupSchema>;