import * as z from "zod";

// define to structure a URL
export const urlSchema = z.object({
    originalUrl: z.string().url(),
    customAlias: z.string().optional(),
    expiresAt: z.string().datetime().optional()
})

