import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { env } from '../env'
import { accessInviteLink } from '../functions/access-invite-link'
import { redis } from '../redis/client'

export const accessInviteLinkRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/invites/:subscriberId',
    {
      schema: {
        schema: 'Access invite link and redrirects user',
        tags: ['Referral'],
        params: z.object({
          subscriberId: z.string(),
        }),
        response: {
          201: z.object({ subscriberId: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { subscriberId } = request.params

      await accessInviteLink({ subscriberId })

      console.log(await redis.hgetall('referral:access-count'))

      const redirectUrl = new URL(env.FRONTEND_URL)

      // set referrer's ID into its referring url
      redirectUrl.searchParams.set('referrer', subscriberId)
      // redirect 301: permanent -> browser will cache the redirect
      // redirect 302: temporary -> browser will not cache the redirect
      return reply.redirect(redirectUrl.toString(), 302)
    }
  )
}
