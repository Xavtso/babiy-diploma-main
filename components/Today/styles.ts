import styled from 'styled-components'

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 24px;
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;
  letter-spacing: 0.1px;
  color: #1d1d1d;
  min-width: 100%;
  width: fit-content;
`

export const Item = styled.div`
  display: grid;
  gap: 16px;

  grid-template-columns: minmax(200px, auto) 68px 114px;
`

export const Cell = styled.div`
  min-height: 60px;
  padding: 16px;
  background: #f2f2f2;
  border-radius: 16px;

  display: flex;
  align-items: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
  justify-content: center;
  overflow: hidden;

  &:first-child {
    justify-content: flex-start;
    text-align: left;
    flex: 1 1;
    min-width: 200px;
  }
`
