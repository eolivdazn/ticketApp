import {z} from "zod"

export const ticketSchema = z.object({
    title: z.string().min(1,"Title is required").max(255),
    description: z.string().min(1,"Description is required").max(666),
    status: z.enum(["STARTED", "OPEN", "CLOSED"]).optional(),
    priority: z.enum(["LOW", "HIGH", "MEDIUM"]).optional(),
    // assignedToUserId: z.number().optional() || null
})