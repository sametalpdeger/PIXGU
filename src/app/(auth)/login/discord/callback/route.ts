import { auth, discordAuth } from '@/auth/lucia'
import { db } from '@/db'
import { usernameId } from '@/schema/user'
import { OAuthRequestError } from '@lucia-auth/oauth'
import { eq } from 'drizzle-orm'
import { cookies, headers } from 'next/headers'

import type { NextRequest } from 'next/server'

export const GET = async (request: NextRequest) => {
  const storedState = cookies().get('discord_oauth_state')?.value
  const url = new URL(request.url)
  const state = url.searchParams.get('state')
  const code = url.searchParams.get('code')
  // validate state
  if (!storedState || !state || storedState !== state || !code) {
    return new Response(null, {
      status: 400,
    })
  }
  try {
    const { getExistingUser, discordUser, createUser } =
      await discordAuth.validateCallback(code)

    const getUser = async () => {
      const existingUser = await getExistingUser()
      if (existingUser) return existingUser

      const createUsernameId = await db.insert(usernameId).values({})

      const user = await createUser({
        attributes: {
          username: discordUser.username,
          profile_picture: `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.webp`,
          username_id: parseInt(createUsernameId.insertId),
        },
      })

      await db
        .update(usernameId)
        .set({ userId: user.userId })
        .where(eq(usernameId.id, parseInt(createUsernameId.insertId)))

      await db.insert(usernameId).values({
        userId: user.userId,
      })

      return user
    }

    const user = await getUser()
    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    })
    const authRequest = auth.handleRequest(request.method, {
      cookies,
      headers,
    })
    authRequest.setSession(session)
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/', // redirect to profile page
      },
    })
  } catch (e) {
    console.error(e)

    if (e instanceof OAuthRequestError) {
      // invalid code
      return new Response(null, {
        status: 400,
      })
    }
    return new Response(null, {
      status: 500,
    })
  }
}
