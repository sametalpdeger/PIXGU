import { POWERUP_PRICES } from '@/constants'
import { sendCoinInfo } from '@/helpers/room'
import type { Locale } from '@/types/locale'
import { useCoins, useHostPainterData, usePlayersPowerups, useSocketIO, useWhoIsPainter } from '@/zustand/store'

export const changeThemes = (locale: Locale, userID: string) => {
    if (
        !useWhoIsPainter.getState().isPainter(userID) ||
        useHostPainterData.getState().value.status !== 'painterSelectingTheme' ||
        !usePlayersPowerups.getState().users[userID]!.powerups!.changeThemes!.isActive ||
        useCoins.getState().coins[userID]! < POWERUP_PRICES.changeThemes
    ) {
        // TODO: fix useWhoIsPainter status for host
        console.log('change themes exit')
        console.log(
            !useWhoIsPainter.getState().isPainter(userID),
            useWhoIsPainter.getState().value.status !== 'selectingTheme',
            useHostPainterData.getState().value.status !== 'painterSelectingTheme',
            !usePlayersPowerups.getState().users[userID]!.powerups!.changeThemes!.isActive,
            useCoins.getState().coins[userID]! < POWERUP_PRICES.changeThemes
        )
        return
    }

    useCoins.getState().decrease(userID, POWERUP_PRICES.changeThemes)
    sendCoinInfo([userID])

    useSocketIO.getState().io!.emit('change-themes', {
        locale: locale,
        count: 2,
        userID
    })
}