import MainButton from './MainButton'
import Image from 'next/image'
import friends from '@/png/friends.png'
import { getIsLogged } from '@/context/server'

const Friends = ({ name, description }: Props) => {
  const isLogged = getIsLogged()

  return (
    <div>
      <MainButton
        link="/f"
        icon={
          <Image
            className=" size-12 opacity-30 drop-shadow-[0_0px_8px_rgba(0,0,0,0.7)]"
            src={friends}
            alt="friends?"
          />
        }
        name={name}
        disabled={!isLogged}
        description={description}
        keyName="3"
        roundedClass={'rounded-bl-md'}
        className="h-full w-full hover:from-[#00aaff9c] hover:to-[rgba(255,255,255,0.3)]"
      />
    </div>
  )
}

export default Friends

type Props = {
  name: string
  description: string
}
