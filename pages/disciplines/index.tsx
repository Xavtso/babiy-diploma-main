import type { ReactElement } from 'react'
import Layout from 'components/Layout'
import Disciplines from 'components/Disciplines'

const DisciplinesPage = () => <Disciplines />

DisciplinesPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export default DisciplinesPage
