import { z } from "zod";


export const createSessionSchema = z.object({
  title: z.string().min(2, "Session title is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
});

export type CreateSessionFormData = z.infer<typeof createSessionSchema>;
