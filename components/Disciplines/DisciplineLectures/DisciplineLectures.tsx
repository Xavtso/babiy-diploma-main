import React from 'react'
import dayjs from 'dayjs'
import Card, { Title } from 'components/Card'
import useUser from 'utils/useUser'
import Spinner from 'components/Spinner'
import { Table, TableHeader, Row } from 'components/Table'
import useDisciplineLectures from 'utils/useDisciplineLectures'

interface DisciplineLecturesProps {
  id: string
}

const DisciplineLectures: React.FC<DisciplineLecturesProps> = ({ id }) => {
  const { user } = useUser()
  const { discipline, lectures, isValidating } = useDisciplineLectures(id, user?.group?.code)

  if (!id) return null

  return (
    <Card>
      {!discipline && isValidating ? (
        <Spinner />
      ) : (
        <>
          <Title>{discipline?.title} / Список занять</Title>
          {Array.isArray(lectures) && lectures.length > 0 ? (
            <Table>
              <thead>
                <TableHeader>
                  <th>№</th>
                  <th>Назва</th>
                  <th>Тип</th>
                  <th>Дата</th>
                  <th>Документ</th>
                </TableHeader>
              </thead>
              <tbody>
                {lectures?.map?.(({ id: lectureId, title, start_time: startTime, link, type }, i) => (
                  <Row key={lectureId}>
                    <td>{i + 1}</td>
                    <td>{title}</td>
                    <td>{type}</td>
                    <td>{dayjs(startTime).format('DD.MM.YYYY')}</td>
                    <td>
                      {link ? (
                        <a href={link} target="_blank" rel="noreferrer">
                          Завантажити
                        </a>
                      ) : (
                        '-'
                      )}
                    </td>
                  </Row>
                ))}
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

export default DisciplineLectures
