import type { ReactElement } from 'react'
import styled from 'styled-components'
import Layout from 'components/Layout'
import Tasks from 'components/Tasks'
import Today from 'components/Today'

const Wrapper = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: minmax(0, 1fr) 380px;
  overflow: hidden;
  width: 100%;
  @media (max-width: 1020px) {
    grid-template-columns: minmax(0, 1fr);
  }
`

const Dashboard = () => (
  <Wrapper>
    <Today />
    <Tasks />
  </Wrapper>
)

Dashboard.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export default Dashboard
