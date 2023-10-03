import React from 'react'
import Card, { Title } from 'components/Card'
import useUser from 'utils/useUser'
import useToday from 'utils/useToday'
import Spinner from 'components/Spinner'
import { List } from './styles'
import Lecture from './Lecture'

const Today: React.FC = () => {
  const { user } = useUser()
  const { lectures, isValidating } = useToday(user?.group?.code)

  return (
    <Card>
      <Title>Сьогодні</Title>
      {
        // Loading
        !lectures && isValidating ? (
          <Spinner />
        ) : // Has data to show
        Array.isArray(lectures) && lectures.length > 0 ? (
          <List>
            {lectures?.map((lection) => (
              <li key={lection?.id}>
                <Lecture lecture={lection} />
              </li>
            ))}
          </List>
        ) : (
          // No Data
          <div>No Data</div>
        )
      }
    </Card>
  )
}

export default Today
