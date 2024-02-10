import { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'
import { z } from 'zod'

import { prisma } from '../../lib/prisma'
import { redis } from '../../lib/redis'
import { voting } from '../../utils/voting-pub-sub'

export async function voteOnPoll(app: FastifyInstance) {
  app.post('/polls/:pollId/votes', async (request, reply) => {
    const voteOnPollBody = z.object({
      option_id: z.string().uuid(),
    })

    const voteOnPollParams = z.object({
      pollId: z.string(),
    })

    const { option_id } = voteOnPollBody.parse(request.body)
    const { pollId } = voteOnPollParams.parse(request.params)

    let { sessionId } = request.cookies

    if (sessionId) {
      const userPreviousVoteOnPoll = await prisma.vote.findUnique({
        where: {
          sessionId_pollId: {
            sessionId,
            pollId,
          },
        },
      })

      if (userPreviousVoteOnPoll) {
        if (userPreviousVoteOnPoll.pollOptionId === option_id) {
          return reply
            .status(400)
            .send({ message: 'You have already voted on this poll' })
        }

        await prisma.vote.delete({
          where: {
            id: userPreviousVoteOnPoll.id,
          },
        })

        const votes = await redis.zincrby(
          pollId,
          -1,
          userPreviousVoteOnPoll.pollOptionId,
        )

        voting.publish(pollId, {
          poolOptionId: userPreviousVoteOnPoll.pollOptionId,
          votes: Number(votes),
        })
      }
    }

    if (!sessionId) {
      sessionId = randomUUID()

      reply.setCookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        signed: true,
        httpOnly: true,
      })
    }

    await prisma.vote.create({
      data: {
        pollOptionId: option_id,
        sessionId,
        pollId,
      },
    })

    const votes = await redis.zincrby(pollId, 1, option_id)

    voting.publish(pollId, {
      poolOptionId: option_id,
      votes: Number(votes),
    })

    return reply.status(201).send()
  })
}
