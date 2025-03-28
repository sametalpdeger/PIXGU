import { api } from '@/trpc/react'
import { useEffect } from 'react'
import { selectedUserInfoAtom } from '@/app/c/atoms'
import { useSetAtom } from 'jotai'
import { getSearchParam } from '@/utils/getSearchParam'

export const useIfInıtSearchParamExits = (
  searchParamU: string | null | undefined,
) => {
  const setSelectedUserInfo = useSetAtom(selectedUserInfoAtom)

  const firstFriendByName =
    api.user.getFirstFriendByUsernameWithUsernameID.useQuery(searchParamU, {
      enabled: false,
    })

  const firstUserByName = api.user.getByUsernameAndUsernameID.useQuery(
    searchParamU,
    {
      enabled: false,
    },
  )

  useEffect(() => {
    // if user specified user in the url
    if (getSearchParam('u')) {
      if (!firstFriendByName.isFetched) firstFriendByName.refetch()

      if (firstFriendByName?.data) {
        console.log('if (firstFriendByName?.data)')
        const { id, profilePicture, usernameWithUsernameID } =
          firstFriendByName.data

        setSelectedUserInfo({
          ID: id,
          name: usernameWithUsernameID,
          pfp: profilePicture,
          isFriend: true,
        })
      }
    }

    if (firstFriendByName.isFetched && !firstFriendByName.data) {
      console.log(
        'if (firstFriendByName.isFetched && !firstFriendByName.data) ',
      )
      if (!firstUserByName.isFetched) firstUserByName.refetch()

      if (firstUserByName.isFetched && firstUserByName.data) {
        console.log('if (firstUserByName.isFetched && firstUserByName.data)')
        const { id, profilePicture, usernameWithUsernameID } =
          firstUserByName.data

        setSelectedUserInfo({
          ID: id,
          name: usernameWithUsernameID,
          pfp: profilePicture,
          isFriend: false,
        })
      }
    }
  }, [firstFriendByName, firstUserByName, searchParamU, setSelectedUserInfo])
}
