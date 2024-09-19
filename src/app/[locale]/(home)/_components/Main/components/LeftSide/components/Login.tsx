import { getIsLogged } from '@/context/server'
import MainButton from './MainButton'
import login from '@/png/login.png'
import Image from 'next/image'

const Login = ({ name, description }: Props) => {
  const isLogged = getIsLogged()
  if (isLogged) return null

  return (
    <MainButton
      link="/login"
      icon={
        <Image
          className="h-[3rem] w-[3rem] opacity-30 drop-shadow-[0_0px_8px_rgba(0,0,0,0.7)]"
          src={login}
          alt="login"
        />
      }
      name={name}
      description={description}
      keyName="4"
      className="rounded-br-md hover:from-[rgba(59,164,255,0.4)] hover:to-[rgba(255,255,255,0.3)]"
    />
  )
}

export default Login

type Props = {
  name: string
  description: string
}
