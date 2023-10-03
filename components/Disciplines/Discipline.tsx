import React from 'react'
import Link from 'next/link'
import { Title } from 'components/Card'
import type IDiscipline from 'types/discipline'
import { DisciplineCard, Teacher, Footer, StyledLink } from './styles'

interface DisciplinesProps {
  discipline: IDiscipline
}

const Discipline: React.FC<DisciplinesProps> = ({ discipline }) => {
  if (!discipline) return null
  const { id, title, classes } = discipline
  const teacherName = classes?.map((c) => c?.teacher?.name).filter(Boolean)[0]
  return (
    <DisciplineCard>
      <Title>{title}</Title>

      <Teacher>{teacherName}</Teacher>

      <Footer>
        <Link href={`/disciplines/${id}/lectures`} passHref>
          <StyledLink>Заняття</StyledLink>
        </Link>
        <Link href={`/disciplines/${id}/tasks`} passHref>
          <StyledLink>Завдання</StyledLink>
        </Link>
      </Footer>
    </DisciplineCard>
  )
}

export default Discipline
