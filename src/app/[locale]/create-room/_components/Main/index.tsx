import { Inter } from 'next/font/google'
import PlayerCount from './components/PlayerCount'
import Password from './components/Passsword'
import Name from './components/Name'

const inter500 = Inter({
  subsets: ['latin'],
  weight: ['600', '500'],
})

const Main = () => {
  return (
    <main
      className={`${inter500.className} flex h-full w-full flex-col gap-2 p-2`}
    >
      <Name />
      {/* <PlayerCount
        name="Oyuncu sayısı"
        info="Minimum değere ulasılmadığı taktirde oyun baslamayacaktır."
      /> */}
      <Password />
    </main>
  )
}

export default Main
