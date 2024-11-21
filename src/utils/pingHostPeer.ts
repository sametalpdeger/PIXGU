import { usePing } from '@/zustand/store'
import { sendToHostPeer } from './sendToHostPeer'

/**
 * This function uses the ping mechanism to measure the latency between peers
 * @link https://en.wikipedia.org/wiki/Ping_(networking_utility)
 */
export const pingHostPeer = (heartbeatIntervalMs: number) => {
  usePing.getState().setInterval(
    setInterval(
      () =>
        sendToHostPeer({

          event: 'ping',
          data: {
            date: Date.now(),
            ping: usePing.getState().ping,
            something:
              'Ad eiusmod qui in aliqua irure. Ipsum eu elit enim mollit adipisicing incididunt.',
          },
        }),
      heartbeatIntervalMs,
    ),
  )
}
