import type { ReactElement } from 'react'
import Layout from 'components/Layout'
import Schedule from 'components/Schedule'

const SchedulePage = () => <Schedule />

SchedulePage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export default SchedulePage
