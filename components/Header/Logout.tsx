import React from 'react'
import { MdExitToApp } from 'react-icons/md'
import useUser from 'utils/useUser'
import { LogOutButotn } from './styles'

const Logout: React.FC = () => {
  const { isLoggedIn, logOut } = useUser()

  if (!isLoggedIn) return null

  return (
    <LogOutButotn onClick={logOut} type="button" aria-label="LogOut">
      <MdExitToApp />
    </LogOutButotn>
  )
}

export default Logout
