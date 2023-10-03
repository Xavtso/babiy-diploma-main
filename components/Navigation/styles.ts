import styled from 'styled-components'
import Card from 'components/Card'

export const NavigationWrapper = styled(Card)`
  min-height: unset;
  height: fit-content;
  max-height: 100%;
  padding: 24px 0px;
`

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;

  & > li {
    padding: 0 16px;

    & a {
      align-items: center;
      border-radius: 4px;
      display: flex;
      gap: 24px;
      min-height: 36px;
      transition: all 0.2s ease-in;
      padding: 6px 12px;
      overflow: hidden;

      font-weight: 500;
      font-size: 16px;
      line-height: 21px;
      letter-spacing: 0.1px;

      & > span {
        align-items: center;
        display: flex;
      }

      & svg {
        color: #8e8e93;
        transition: color 0.1s ease-in;
        height: 24px;
        width: 24px;
      }

      &:hover,
      &:focus,
      &[data-active='true'] {
        background: #eaf2fd;
        color: #2f80ed;
        & svg {
          color: inherit;
        }
      }
    }
  }
`
