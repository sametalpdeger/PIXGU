import type { Guest, RTCStats } from '@/types'
import { onPeerConnect, onPeerClose, onPeerError, onPeerSignal } from './funcs'
import { simplePeer } from '@/utils/simplePeer'
import { useMatchStatus, usePeers, useSocketIO } from '@/zustand/store'
import type { User } from 'lucia'
import { violetLog } from '@/utils/violetLog'

/**
 * Create a webrtc peer connection to the given user.
 */
export const createPeer = (roomID: string, user: User | Guest) => {
  const ID = 'id' in user ? user.id : user.ID

  if (useMatchStatus.getState().value.matchCount !== 0) {
    useSocketIO.getState().io!.emit('not-allowed', ID)
    return
  }


  const peer = simplePeer({
    initiator: true,
  })

  usePeers.getState().add({
    ID,
    peer,
  })

  onPeerSignal(peer, ID)
  onPeerConnect(peer, ID, roomID, user)
  onPeerError(peer, ID)
  onPeerClose(peer, ID, roomID)
}
