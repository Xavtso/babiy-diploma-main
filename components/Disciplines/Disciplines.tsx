import React from 'react'
import useDisciplines from 'utils/useDisciplines'
import Spinner from 'components/Spinner'
import useUser from 'utils/useUser'
import Card from 'components/Card'
import Discipline from './Discipline'
import { Grid, NoData } from './styles'

const Disciplines: React.FC = () => {
  const { user } = useUser()
  const { disciplines, isValidating } = useDisciplines(user?.group?.code)
  if (!disciplines && isValidating) return <Spinner />
  if (Array.isArray(disciplines) && disciplines.length > 0) {
    return (
      <Grid>
        {disciplines?.map?.((discipline) => (
          <Discipline discipline={discipline} key={discipline.id} />
        ))}
      </Grid>
    )
  }
  return (
    <Card>
      <NoData>Немає активних дисциплiн</NoData>
    </Card>
  )
}

export default Disciplines
