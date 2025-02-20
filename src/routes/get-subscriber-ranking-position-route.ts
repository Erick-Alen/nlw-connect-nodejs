import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { getSubscriberRankingPosition } from '../functions/get-subscriber-ranking-position'

export const getSubscriberRankingPositionRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/subscribers/:subscriberId/ranking/position',
      {
        schema: {
          schema: 'Get subscriber ranking position',
          tags: ['Referral'],
          params: z.object({
            subscriberId: z.string(),
          }),
          response: {
            201: z.object({ position: z.number().nullable() }),
          },
        },
      },
      async (request, _) => {
        const { subscriberId } = request.params

        const { position } = await getSubscriberRankingPosition({ subscriberId })

        return { position }
      }
    )
  }
