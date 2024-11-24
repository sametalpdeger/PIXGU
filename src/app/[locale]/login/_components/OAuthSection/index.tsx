import { getLocale } from '@/context/server'
import Link from 'next/link'
import { getLangObj } from './lang'
import { Discord } from './components/discord'
import { Google } from './components/google'
import { Spotify } from './components/spotify'
import { Github } from './components/github'
import { Section } from '../Section'

const OAuthSection = async () => {
  const locale = getLocale()
  const langObj = await getLangObj(locale)

  return (
    <Section title={langObj.oauthDesc}>
      <div className="grid w-full grid-cols-5 gap-2 rounded-md backdrop-blur-3xl pointer-events-none cursor-not-allowed">
        <Discord />
        <Google />
        <Spotify />
        <Github />
      </div>
      {/* <Link
        href={'/articles/oeu90qdjAS)'}
        className={`${inter.className} whitespace-pre-line rounded-md bg-[rgba(255,255,255,0.2)] p-2 text-sm font-[400] underline`}
      >
        {langObj.passwordArticleDesc}
      </Link> */}
    </Section>
  )
}

export default OAuthSection
