import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/schema/subscriptions'

export async function subscribeToEvent(name: string, email: string) {
  const result = await db
    .insert(subscriptions)
    .values({
      name,
      email,
    })
    .returning()

  const subscriber = result[0]

  return {
    subscriberId: subscriber.id,
  }
}
