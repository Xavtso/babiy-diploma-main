import type { ReactElement } from 'react'
import styled from 'styled-components'
import Layout from 'components/Layout'
import Card from 'components/Card'
import Link from 'next/link'

const Wrapper = styled(Card)`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 320px;
  text-align: center;
`

const Title = styled.h1`
  font-size: 48px;
  font-weight: bold;
`

const Description = styled.p`
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.15px;
`

const BackToHomeButton = styled.a`
  align-items: center;
  background: #eaf2fd;
  border-radius: 20px;
  color: #000000;
  display: flex;
  font-weight: 400;
  font-size: 16px;
  justify-content: center;
  line-height: 21px;
  letter-spacing: 0.1px;
  text-align: center;
  padding: 6px 24px;
  margin-top: 20px;
  min-width: 200px;
  min-height: 36px;
`

const Dashboard = () => (
  <Wrapper>
    <Title>404</Title>
    <Description>Сторінку не знайдено</Description>
    <Link href="/">
      <BackToHomeButton>Повернутись на головну</BackToHomeButton>
    </Link>
  </Wrapper>
)

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Dashboard
