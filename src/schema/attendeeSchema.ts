import { z } from "zod";


export const joinCodePreviewSchema = z.object({
  join_code: z.string().length(6, "six character required"),
});

export type JoinCodePreviewSchema = z.infer<typeof joinCodePreviewSchema>;
