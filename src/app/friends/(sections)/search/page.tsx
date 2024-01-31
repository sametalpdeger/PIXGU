import { Inter } from 'next/font/google'
import SearchBox from './_components/SearchBox'
import Users from './_components/Users'

const inter = Inter({
  subsets: ['latin'],
  weight: ['500', '700'],
})

const Search = () => {
  return (
    <section
      className={`${inter.className} flex animate-fade flex-col`}
    >
      <SearchBox />
      <Users />
    </section>
  )
}

export default Search
