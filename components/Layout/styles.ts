import styled from 'styled-components'
import { NavigationWrapper } from 'components/Navigation/styles'

export const LayoutWrapper = styled.div`
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  grid-template-columns: 264px minmax(0, 1fr);
  gap: 24px;
  min-height: 100vh;
  width: 100%;

  @media (min-width: 1021px) {
    max-height: 100vh;
    overflow: hidden;
  }
  @media (max-width: 1020px) {
    grid-template-columns: minmax(0, 1fr);
    & ${NavigationWrapper} {
      grid-row: 3;
    }
  }

  & > main {
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
  }
`
