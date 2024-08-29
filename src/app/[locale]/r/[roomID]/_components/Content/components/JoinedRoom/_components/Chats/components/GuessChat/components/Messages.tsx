'use client'

import { Msg } from './Msg'
import { MyMsg } from './MyMsg'
import { useRoomGuessChatMsgsStore } from '@/zustand/store'

export const Messages = () => {
  const messages = useRoomGuessChatMsgsStore((state) => state.msgs)

  console.log(messages)
  return messages.map((rtcData) => {
    const { myMsg } = rtcData

    if (!myMsg) {
      const { from, msg, msgID } = rtcData.data

      return <Msg key={msgID} ID={from} msg={msg} />
    } else if (myMsg) {
      const { msg, msgID } = rtcData.data

      return <MyMsg key={msgID} msg={msg} />
    }
  })
}
