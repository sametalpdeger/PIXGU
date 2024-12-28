import 'server-only'

import type { Locale, PartialRecord } from '@/types'

const langJSONs: LangJSONs = {
  en: () => import('./json/en.json').then((m) => m.default),
  tr: () => import('./json/tr.json').then((m) => m.default),
  // esi: () => import('./json/esi.json').then((module) => module.default),
}

export const getLangObj = async (locale: Locale): Promise<LangObj> => {
  const langJson = langJSONs[locale as Locale]

  if (!langJson) return langJSONs['en']()
  return langJson()
}

type keys =
  | 'privacy'
  | 'portfolio'

type Values = string

type LangObj = Record<keys, Values>
type LangJSONs = PartialRecord<Exclude<Locale, 'en'>, () => Promise<LangObj>> &
  Record<'en', () => Promise<LangObj>>
