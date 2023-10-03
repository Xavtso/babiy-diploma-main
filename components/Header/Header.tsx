import React from 'react'
import Logout from './Logout'
import Status from './Status'
import { HeaderWrapper } from './styles'

const Header: React.FC = () => (
  <HeaderWrapper>
    <Status />
    <Logout />
  </HeaderWrapper>
)

export default Header
