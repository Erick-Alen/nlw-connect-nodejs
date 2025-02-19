import z from 'zod'

const envSchema = z.object({
  API_URL: z.string().default('http://localhost'),
  PORT: z.coerce.number().default(3333),
})

export const env = envSchema.parse(process.env)
