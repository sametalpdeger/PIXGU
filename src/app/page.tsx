// react
import { Fragment } from 'react'
// next
import Image from 'next/image'
// components
import Logo from '@/png/logo.png'
import MainButton from './_components/MainButton'
import Link from 'next/link'
import Discord from '@/svg/Discord'
// images
import login from '@/png/login.png'
import questionmark from '@/png/questionmark.png'
import play from '@/png/play.png'
import createroom from '@/png/createroom.png'
import Twitter from '@/public/images/svg/Twitter'

const Home = () => {
  return (
    <Fragment>
      <main
        className={`flex h-full w-full flex-col items-center gap-3 overflow-y-auto bg-gray-900 py-[1rem]`}
      >
        <div className="flex animate-fade flex-col gap-4 p-4 animate-duration-1000">
          <div className="flex w-full flex-row justify-between gap-1">
            <Image
              src={Logo}
              alt="logo"
              className="h-[auto] w-[6rem] select-none"
              sizes="calc(2.33vw + 90px)"
            ></Image>
            <div className="flex flex-row items-center gap-2">
              <Link href="discord.gg/falan">
                <Discord
                  width="2rem"
                  height="2rem"
                  color="rgba(255, 255, 255, 0.5)"
                  className="hover:fill-[rgba(255,255,255,0.7)]"
                />
              </Link>

              <Link href="a">
                <Twitter
                  width="2rem"
                  height="2rem"
                  color="rgba(255, 255, 255, 0.5)"
                  className="hover:fill-[rgba(255,255,255,0.7)]"
                />
              </Link>
            </div>
          </div>
          <div
            id="a"
            className=" h-min-[20rem] animate-[position_15s_ease-in-out_infinite] rounded-md   bg-gradient-to-tl from-[rgb(189,255,185)] via-[rgb(184,244,255)] to-[rgb(242,255,187)]  p-2"
          >
            <div className="grid h-full w-full gap-2 rounded-md bg-[rgba(0,0,0,0.7)] p-2 xs:grid-cols-1 md:grid-cols-2 md:grid-rows-2 ">
              <MainButton
                link="/join-room"
                icon={
                  <Image
                    src={play}
                    alt="play"
                    className="h-[3rem] w-[3rem] opacity-30 drop-shadow-[0_0px_8px_rgba(0,0,0,0.7)]"
                  />
                }
                name="Odaya katıl"
                description="Odaya katıl ve oynamaya başla!"
                className="hover:from-[rgba(55,255,188,0.4)] hover:to-[rgba(255,255,255,0.3)]"
              />

              <MainButton
                link="/create-room"
                icon={
                  <Image
                    className="h-[3rem] w-[3rem] opacity-30 drop-shadow-[0_0px_8px_rgba(0,0,0,0.7)]"
                    src={createroom}
                    alt="createroom"
                  />
                }
                name="Oda oluştur"
                description="Oda oluştur ve arkadaşlarını davet et!"
                className="hover:from-[rgba(255,238,53,0.4)] hover:to-[rgba(255,255,255,0.3)]"
              />

              <MainButton
                link="/how-to-play"
                icon={
                  <Image
                    className="h-[3rem] w-[3rem] opacity-30 drop-shadow-[0_0px_8px_rgba(0,0,0,0.7)]"
                    src={questionmark}
                    alt="questionmark"
                  />
                }
                name="Nasıl oynanır?"
                description="Nasıl oynayacağını bilmiyor musun? Hemen öğren!"
                className="hover:from-[rgba(53,228,255,0.4)] hover:to-[rgba(255,255,255,0.3)]"
              />

              <MainButton
                link="/login"
                icon={
                  <Image
                    className="h-[3rem] w-[3rem] opacity-30 drop-shadow-[0_0px_8px_rgba(0,0,0,0.7)]"
                    src={login}
                    alt="login"
                  />
                }
                name="Giriş yap"
                description="Hızlı bir şekilde giriş yapın ve devam edin."
                className="hover:from-[rgba(59,164,255,0.4)] hover:to-[rgba(255,255,255,0.3)]"
              />
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  )
}

export default Home
