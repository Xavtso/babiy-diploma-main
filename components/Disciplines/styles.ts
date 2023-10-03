import styled from 'styled-components'
import Card, { Title } from 'components/Card'

export const Grid = styled.ul`
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  padding-right: 40px;
  width: 100%;
`

export const DisciplineCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 200px;
`

export const Footer = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const Teacher = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;
  letter-spacing: 0.1px;
`

export const StyledLink = styled.a`
  display: block;
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
  letter-spacing: 0.15px;
  text-decoration-line: underline;
  color: #1d1d1d;
`

export const NoData = styled(Title)`
  margin-top: 100px;
  margin-bottom: 20px;
  text-align: center;
`
