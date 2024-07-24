import type { Locale } from '@/types'
import { api } from '@/trpc/server'
import dynamic from 'next/dynamic'
import { redisDb } from '@/db/redis'

const ErrDisplay = dynamic(() => import('@/components/ErrDisplay'))
const JoinedRoom = dynamic(() => import('./_components/JoinedRoom'))

const Room = async ({ params }: Props) => {
  const roomID = params.roomID
  const user = await api.auth.getUser.query()
  if (!user) throw new Error('UNAUTHORIZED')

  const { ablyBasicClient } = await import('@/utils/ablyBasicClient')
  const { ablyClient } = await ablyBasicClient({
    clientId: user.id,
  })

  try {
    const { isUserHavePermToJoin } = await import('./func')
    const roomChannel = ablyClient.channels.get(`room:${roomID}`)
    await isUserHavePermToJoin(user.id, roomID, roomChannel)

    const { waitServer } = await import('./func')
    const firstEnterChannel = ablyClient.channels.get(
      `room:${roomID}:first-enter`,
    )
    const myFirstEnterChannel = ablyClient.channels.get(
      `room:${roomID}:first-enter:${user.id}`,
    )

    await waitServer(user.id, roomID, myFirstEnterChannel, firstEnterChannel)

    const hostID = await redisDb.get<string>(`room:${roomID}:host_ID`)
    if (!hostID) throw new Error('NO_HOST_ID')

    const isHostPlayer = await redisDb.get<boolean>(
      `room:${roomID}:is_host_player`,
    )
    if (isHostPlayer === null || isHostPlayer === undefined)
      throw new Error('NO_PLAYER_HOST')

    const { setServerContexts } = await import('./func')
    setServerContexts(params.locale, roomID, user, hostID, isHostPlayer)

    ablyClient.close()

    return <JoinedRoom />
  } catch (e) {
    ablyClient.channels.get('*').unsubscribe()
    ablyClient.close()

    if (e instanceof Error) {
      if (e.message === 'UNAUTHORIZED')
        return (
          <ErrDisplay
            msg="UNAUTHORIZED"
            reason="You need to be logged in to join a room"
            code={401}
            redirectTo="/login"
          />
        )

      if (e.message === 'ROOM_NOT_FOUND')
        return (
          <ErrDisplay
            msg="NOT FOUND"
            reason="This room does not exist"
            code={404}
          />
        )

      if (e.message === 'ALREADY_IN_ROOM')
        return (
          <ErrDisplay
            msg="BAD REQUEST"
            reason="You are already in this room in another tab"
          />
        )

      if (e.message === 'PASSWORD_REQUIRED')
        return (await import('next/navigation')).redirect(`/r/${roomID}/p`)

      if (e.message === 'BLOCKED')
        return (
          <ErrDisplay
            msg="UNAUTHORIZED"
            reason="You have blocked from this room"
          />
        )

      return <ErrDisplay msg={e.message} />
    }

    return <ErrDisplay msg="UNKNOWN" />
  }
}

export default Room

type Props = {
  params: {
    locale: Locale
    roomID: string
  }
}
