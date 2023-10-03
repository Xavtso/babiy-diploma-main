import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MdDashboard, MdPeople, MdAssignment } from 'react-icons/md'
import { IoMdCalendar, IoMdSettings } from 'react-icons/io'
import { NavigationWrapper, List } from './styles'

interface NavLinkProps {
  children: React.ReactNode
  href: string
  icon?: React.ReactNode
}

const NavLink: React.FC<NavLinkProps> = ({ children, href, icon }) => {
  const router = useRouter()
  const { pathname } = router

  return (
    <Link href={href} passHref>
      <a href={href} data-active={pathname.startsWith(href)}>
        <span>{icon}</span>
        <span>{children}</span>
      </a>
    </Link>
  )
}

const Navigation: React.FC = () => (
  <NavigationWrapper as="nav">
    <List>
      <li>
        <NavLink href="/dashboard" icon={<MdDashboard />}>
          Дашбоард
        </NavLink>
      </li>
      <li>
        <NavLink href="/students" icon={<MdPeople />}>
          Студенти
        </NavLink>
      </li>
      <li>
        <NavLink href="/disciplines" icon={<MdAssignment />}>
          Дисципліни
        </NavLink>
      </li>
      <li>
        <NavLink href="/schedule" icon={<IoMdCalendar />}>
          Розклад
        </NavLink>
      </li>
      <li>
        <NavLink href="/settings" icon={<IoMdSettings />}>
          Налаштування
        </NavLink>
      </li>
    </List>
  </NavigationWrapper>
)

export default Navigation
