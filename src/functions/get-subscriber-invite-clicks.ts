import { redis } from '../redis/client'

interface GetSubscriberInviteClicksParams {
  subscriberId: string
}

export async function getSubscriberInviteClicks({ subscriberId }: GetSubscriberInviteClicksParams) {
  const count = await redis.zscore('referral:invite-links', subscriberId)
  return {count: count ? Number.parseInt(count) : 0}
}
