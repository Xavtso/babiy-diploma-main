import React from 'react'
import useUser from 'utils/useUser'
import Header from 'components/Header'
import Spinner from 'components/Spinner'
import Navigation from 'components/Navigation'
import { LayoutWrapper } from './styles'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, isLoggedIn } = useUser({ redirectTo: '/login' })

  // Server-render loading state
  if (!user || isLoggedIn === false) {
    return <Spinner />
  }

  return (
    <LayoutWrapper>
      <Header />
      <Navigation />
      <main>{children}</main>
    </LayoutWrapper>
  )
}

export default Layout
