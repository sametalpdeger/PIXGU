import { TRPCError } from '@trpc/server'
import { publicProcedure } from '../../trpc'

export const loggedUserProducure = publicProcedure.use(
  async ({ next, ctx, path, type }) => {
    const start = Date.now()

    const user = ctx.user
    const session = ctx.session

    if (!session || !user)
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'User needs to be logged in to do this',
      })

    const newCtx = { ...ctx, user, session }
    const result = await next({
      ctx: newCtx,
    })

    const durationMs = Date.now() - start
    const meta = { path: path, type: type, durationMs }

    result.ok
      ? console.log('OK request timing:', meta)
      : console.error('Non-OK request timing', meta)

    return result
  },
)
