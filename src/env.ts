import 'dotenv/config' // Load environment variables/
import z from 'zod'
const envSchema = z.object({
  API_URL: z.string().default('http://localhost'),
  PORT: z.coerce.number().default(3333),
  POSTGRES_URL: z
    .string()
    .url(),
  FRONTEND_URL: z.string().url(),
  REDIS_URL: z.string().url(),
})

// console.log('process.env:', process.env)
export const env = envSchema.parse(process.env)
// console.log('env:', { env })
