import type { ReactElement } from 'react'
import Layout from 'components/Layout'
import DisciplineTasks from 'components/Disciplines/DisciplineTasks'
import { useRouter } from 'next/router'

const DisciplineTaskspage = () => {
  const router = useRouter()
  const { id } = router.query
  return <DisciplineTasks id={id as string} />
}

DisciplineTaskspage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export default DisciplineTaskspage
