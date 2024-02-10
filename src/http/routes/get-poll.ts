import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { prisma } from '../../lib/prisma'
import { redis } from '../../lib/redis'
import { REPLCommand } from 'repl'

export async function getPoll(app: FastifyInstance) {
  app.get('/polls/:pollId', async (request, reply) => {
    const getPollParams = z.object({
      pollId: z.string(),
    })

    const { pollId } = getPollParams.parse(request.params)

    const poll = await prisma.poll.findUnique({
      where: {
        id: pollId,
      },
      include: {
        options: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    })

    if (!poll) {
      return reply.status(404).send({ message: 'Poll not found' })
    }

    const result = await redis.zrange(pollId, 0, -1, 'WITHSCORES')

    const votes = result.reduce((object, line, index) => {
      if (index % 2 === 0) {
        const score = result[index + 1]
        Object.assign(object, { [line]: parseInt(score) })
      }

      return object
    }, {} as Record<string, string>)

    return reply.status(200).send({
      poll: {
        id: poll.id,
        title: poll.title,
        options: poll.options.map(option => ({
          id: option.id,
          title: option.title,
          votes: votes[option.id] || 0,
        })),
      },
    })
  })
}
