import { z } from "zod"

export const LoginSchema = z.object({
  email: z.email("messages.invalidEmail"),
  password: z.string().min(8, "messages.invalidPassword")
})
