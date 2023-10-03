import React from 'react'
import dayjs from 'dayjs'
import Card, { Title } from 'components/Card'
import useUser from 'utils/useUser'
import Spinner from 'components/Spinner'
import useDisciplineTasks from 'utils/useDisciplineTasks'
import { Table, TableHeader, Row } from 'components/Table'
import { Uploaded } from './styles'
import Upload from './Upload'

interface DisciplineTasksProps {
  id: string
}

const DisciplineTasks: React.FC<DisciplineTasksProps> = ({ id }) => {
  const { user } = useUser()
  const { discipline, tasks, isValidating, mutate } = useDisciplineTasks(id, user?.group?.code)

  if (!id) return null

  return (
    <Card>
      {!discipline && isValidating ? (
        <Spinner />
      ) : (
        <>
          <Title>{discipline?.title} / Список задач</Title>
          {Array.isArray(tasks) && tasks.length > 0 ? (
            <Table>
              <thead>
                <TableHeader>
                  <th>№</th>
                  <th>Назва</th>
                  <th>Дедлайн</th>
                  <th>Звiт</th>
                  <th>Оцінка</th>
                </TableHeader>
              </thead>
              <tbody>
                {tasks?.map?.(({ id: taskId, title, deadline, uploads }, i) => {
                  const { link, mark } = uploads?.[0] || {}
                  return (
                    <Row key={taskId}>
                      <td>{i + 1}</td>
                      <td>{title}</td>
                      <td>{dayjs(deadline).format('DD.MM.YYYY')}</td>
                      <td>{link ? <Uploaded>Завантажено</Uploaded> : <Upload title={title} taskId={taskId} mutate={mutate} />}</td>
                      <td>{mark || 0}/100</td>
                    </Row>
                  )
                })}
              </tbody>
            </Table>
          ) : (
            <div>No Data</div>
          )}
        </>
      )}
    </Card>
  )
}

export default DisciplineTasks
