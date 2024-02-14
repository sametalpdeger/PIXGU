import { api } from '@/src/trpc/server'
import { notFound } from 'next/navigation'
import { Fragment } from 'react'

const UserChat = async ({
  params,
}: {
  params: { usernameWithUsernameID: string }
}) => {
  const username = params.usernameWithUsernameID.replace('%40', '@')

  console.log(username)
  const isUserExits =
    await api.user.isExitsByUsernameWithUsernameID.query(username)

  if (isUserExits == false) notFound()

  const isUserHaveFriendship =
    await api.user.isFriendExitsByUsernameWithUsernameID.query(username)

  if (isUserHaveFriendship)
    return (
      <Fragment>
        <div className="w-full rounded-t-lg bg-[#ffffff82] p-2">
          <div className="h-[3rem] w-[3rem] rounded-full bg-gray-400"></div>
        </div>
        <div className="flex grow flex-col gap-2 p-2">
          <div className="grow"></div>
          <div className="flex h-[2.5rem] flex-row rounded-lg bg-[#ffffff5e] shadow-[0_0px_10px_1px_rgba(0,0,0,0.2)]">
            <input type="text" className="grow p-2 text-[#0000009e]" />
            <button className="h-full w-[4rem] rounded-r-lg bg-yellow-200"></button>
          </div>
        </div>
      </Fragment>
    )
}
export default UserChat
