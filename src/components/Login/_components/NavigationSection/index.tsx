import BackButton from '@/components/BackButton'
import ToHomeButton from '@/components/ToHomeButton'
import { Inter } from 'next/font/google'
import { getLangObj } from './lang'
import type { Locale } from '@/types'

const inter = Inter({
  subsets: ['latin'],
  weight: ['500'],
})

export const NavigationSection = async ({ locale }: Props) => {
  const langObj = await getLangObj(locale)

  const buttonClassName = `${inter.className} rounded-md bg-[rgba(255,255,255,0.2)] p-1 text-[rgba(255,255,255,0.47)]`

  return (
    <section className={'grid w-full grid-cols-2 gap-2 pb-5'}>
      <BackButton className={buttonClassName}>{`< ${langObj.back}`}</BackButton>
      <ToHomeButton className={buttonClassName}>{langObj.home}</ToHomeButton>
    </section>
  )
}

type Props = {
  locale: Locale
}