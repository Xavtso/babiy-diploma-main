import type { ReactElement } from 'react'
import Layout from 'components/Layout'
import Students from 'components/Students'

const StudentsPage = () => <Students />

StudentsPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export default StudentsPage
