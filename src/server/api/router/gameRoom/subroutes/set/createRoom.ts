import { z } from 'zod'
import { gameRoom } from '@/schema/gameRoom'
import { loggedUserProducure } from '@/procedure'
import { TRPCError } from '@trpc/server'

/**
 * Creates a room
 */
export const createRoom = loggedUserProducure
  .input(
    z.object({
      name: z
        .string()
        .min(1)
        .max(255)
        .refine((v) => v.trim() !== '', {
          message: 'Name cannot be empty string',
        }),
      password: z
        .string()
        .min(1)
        .max(255)
        .refine((v) => v.trim() !== '', {
          message: 'Name cannot be empty string',
        })
        .nullish(),
      isHostPlayer: z.boolean(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const createdAt = new Date()
    const { name, password, isHostPlayer } = input
    const userID = ctx.user.id

    // #region sql database
    const createdRoom = await ctx.db
      .insert(gameRoom)
      .values({
        name: name,
        password: password,
        createdAt: createdAt,
      })
      .returning({ insertedId: gameRoom.ID })

    if (!createdRoom[0]) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' })
    // #endregion

    const roomID = createdRoom[0].insertedId

    // #region redis
    await ctx.redisDb.sadd(`active_rooms`, roomID)
    await ctx.redisDb.set(`room:${roomID}:name`, name)
    await ctx.redisDb.sadd(`room:${roomID}:admins`, userID)
    await ctx.redisDb.sadd(`room:${roomID}:active_players`, userID)
    await ctx.redisDb.set(`room:${roomID}:created_at`, createdAt)
    await ctx.redisDb.set(`room:${roomID}:host_ID`, userID)
    await ctx.redisDb.set(`room:${roomID}:is_host_player`, isHostPlayer)

    if (password) {
      await ctx.redisDb.set(`room:${roomID}:password`, password)
      await ctx.redisDb.sadd(`room:${roomID}:players_known_pass`, userID)
    }

    return {
      createdRoomID: roomID,
    }
  })
