import { z } from 'zod'
import { publicProcedure } from '../../../trpc'
import { user } from '@/schema/user'
import { and, eq } from 'drizzle-orm'

export const generateNewUsernameID = publicProcedure
  .input(
    z.object({
      username: z.string(),
    }),
  )
  .query(async ({ input, ctx }) => {
    let notUnique = true

    while (notUnique) {
      let ID = Math.floor(Math.random() * 1000 + 0).toString()

      switch (ID.length) {
        case 1:
          ID = `${ID}000`
          break
        case 2:
          ID = `${ID}00`
          break
        case 3:
          ID = `${ID}0`
          break
      }

      const sameIDPerson = await ctx.db
        .select({})
        .from(user)
        .where(and(eq(user.usernameID, ID), eq(user.username, input.username)))

      if (!sameIDPerson[0]) notUnique = false
      if (!notUnique) return ID
    }
  })
