import { Title } from 'components/Card'
import React from 'react'
import useUser from 'utils/useUser'

const Status: React.FC = () => {
  const { isLoggedIn, user } = useUser()

  if (!isLoggedIn) return <Title>E-Campus</Title>

  return <Title>{user.name}</Title>
}

export default Status
