import React from 'react'
import Card, { Title } from 'components/Card'
import useUser from 'utils/useUser'
import useTasks from 'utils/useTasks'
import Spinner from 'components/Spinner'
import { List } from './styles'
import Task from './Task'

const Tasks: React.FC = () => {
  const { user } = useUser()
  const { tasks, isValidating } = useTasks(user?.id)
  return (
    <Card>
      <Title>Завдання</Title>

      {!tasks && isValidating ? (
        <Spinner />
      ) : (
        <List>
          {tasks?.map?.((task) => (
            <li key={task.id}>
              <Task task={task} />
            </li>
          ))}
        </List>
      )}
    </Card>
  )
}

export default Tasks
