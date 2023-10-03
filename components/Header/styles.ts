import styled from 'styled-components'

export const HeaderWrapper = styled.header`
  align-items: center;
  background: white;
  border-radius: 0 0 20px 20px;
  display: flex;
  grid-column: 1 / -1;
  justify-content: space-between;
  min-height: 64px;
  height: fit-content;
  padding: 18px 24px;
  & > * {
    margin: 0 !important;
  }
`

export const LogOutButotn = styled.button`
  align-items: center;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  min-height: 32px;
  min-width: 32px;
  padding: 4px;
  transition: all 0.2s ease-in;
  & svg {
    height: 24px;
    width: 24px;
  }
  &:hover,
  &:focus {
    background: #f2f2f2;
  }
`
