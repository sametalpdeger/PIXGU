import clsx from 'clsx'
import User from './components/User'
import { api } from '@/src/trpc/server'

const UsersSection = async () => {
  const users = await api.gameRoom.getPlayingRoomUsers.query()

  return (
    <section id="usersSection" className="h-full overflow-y-scroll pr-2">
      <div className="flex w-[12rem] flex-col shadow-xl">
        {users.map((user, index) => {
          return (
            <User
              key={index}
              name={user.username}
              profilePicture={user.profilePicture}
              className={clsx({
                'rounded-t-lg': index == 0,
                'rounded-b-lg': index == users.length - 1,
              })}
            />
          )
        })}
      </div>
    </section>
  )
}

export default UsersSection
