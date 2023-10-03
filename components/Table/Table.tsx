import styled from 'styled-components'

export const Table = styled.table`
  background: #f2f2f2;
  border-radius: 20px;
  border-spacing: 12px 0;
  padding: 24px;
  width: 100%;
`

export const TableHeader = styled.tr`
  background: #8e8e93;
  border-radius: 15px;
  color: #ffffff;
  font-size: 20px;
  font-weight: 500;
  line-height: 30px;
  letter-spacing: 0.15px;
  min-height: 60px;
  & > th {
    text-align: left;
    padding: 12px;
    &:first-child {
      padding-left: 24px;
    }
    &:last-child {
      padding-right: 24px;
    }
  }
`

export const Row = styled.tr`
  color: black;
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;
  letter-spacing: 0.1px;
  min-height: 60px;
  & > td {
    vertical-align: middle;
    text-align: left;
    padding: 12px;
    &:first-child {
      padding-left: 24px;
    }
    &:last-child {
      padding-right: 24px;
    }
  }
  & a {
    text-decoration-line: underline;
  }
`
