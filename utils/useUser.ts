import { useEffect, useCallback } from 'react'
import Router from 'next/router'
import useSWR from 'swr'
import axios from 'axios'
import type User from 'types/user'

function useUser({ redirectTo = '', redirectIfFound = false } = {}) {
  const { data: user, mutate: mutateUser, error } = useSWR<User>('/api/user')

  const isLoggedIn = !!user?.token

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !user) return

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !isLoggedIn) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && isLoggedIn)
    ) {
      Router.push(redirectTo)
    }
  }, [user, redirectIfFound, redirectTo, isLoggedIn])

  const logOut = useCallback(async () => mutateUser(await axios.post('/api/logout', false)), [mutateUser])

  const hasError = !!error
  useEffect(() => {
    if (hasError) {
      localStorage.clear()
      sessionStorage.clear()
      logOut()
    }
  }, [hasError, logOut])

  return { user, isLoggedIn, mutateUser, logOut }
}

export default useUser
