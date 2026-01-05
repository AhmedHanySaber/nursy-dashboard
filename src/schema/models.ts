import z from "zod"

export const adminSchemas = {
  create: z.object({
    username: z.string().min(3).max(30),
    email: z.email(),
    password: z.string().min(8)
  }),
  update: z.object({
    username: z.string().min(3).max(30).optional(),
    email: z.email().optional()
  })
}

export const walletSchema = {
  create: z.object({
    amount: z.number(),
    type: z.enum(["Credit", "Debit"]),
    description: z.string().max(255).optional()
  })
}

export const serviceSchema = {
  create: z.object({
    name: z.string().min(3).max(50),
    description: z.string().max(255),
    salary: z.coerce.number().min(0),
    hourlyFees: z.coerce.number().min(0),
    status: z.boolean().default(true).optional()
  })
}

export const specificServiceSchema = {
  create: z.object({
    name: z.string().min(3).max(50),
    description: z.string().max(255),
    price: z.coerce.number().min(0),
    serviceId: z.number().min(0),
    status: z.boolean().default(true).optional()
  })
}

export const illnessTypeSchema = {
  create: z.object({
    name: z.string().min(3).max(50),
    description: z.string().max(255)
  })
}
