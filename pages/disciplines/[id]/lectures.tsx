import type { ReactElement } from 'react'
import { useRouter } from 'next/router'
import DisciplineLectures from 'components/Disciplines/DisciplineLectures'
import Layout from 'components/Layout'

const DisciplineLecturesPage = () => {
  const router = useRouter()

  const { id } = router.query

  return <DisciplineLectures id={id as string} />
}

DisciplineLecturesPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export default DisciplineLecturesPage
