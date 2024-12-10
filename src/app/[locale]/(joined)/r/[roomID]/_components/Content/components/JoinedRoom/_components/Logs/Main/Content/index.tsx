import { useGameLogs } from '@/zustand/store'
import { Item } from './components/Item'

export const Content = () => {
    const msgs = useGameLogs(s => s.msgs)

    return msgs.map(msg => <Item key={msg.time} rtcData={msg} />)
}