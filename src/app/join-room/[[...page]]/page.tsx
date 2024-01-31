import Image from 'next/image'
import bg from '@/jpg/sabine-freiberger--U3b6E3SEww-unsplash.jpg'
import { Fragment } from 'react'
import Search from './_components/Search'
import Rooms from './_components/Rooms'
import './_styles/scrollbars.css'

const JoinRoom = () => {
  return (
    <Fragment>
      {/* <Image
        src={bg}
        alt="background image"
        placeholder="blur"
        className="absolute z-0 h-full w-full object-cover"
      /> */}
      <div className="relative z-20 flex h-full w-full flex-col items-center bg-gradient-to-tl from-[hsla(220,39%,10%,1)] via-[hsla(220,39%,10%,1)] to-transparent p-4">
        <div className="flex h-full animate-fade rounded-lg bg-gradient-to-tr from-[#7eea78] via-[#6aba66] to-[#7eea78] p-1">
          <div className="flex w-full flex-col gap-3 rounded-lg bg-[rgba(0,0,0,0.3)] p-2 xxs:w-full lg:w-[40rem]">
            <Search />
            <Rooms />
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default JoinRoom
