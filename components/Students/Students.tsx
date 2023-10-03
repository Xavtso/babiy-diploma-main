import React from 'react'
import Card, { Title } from 'components/Card'
import useUser from 'utils/useUser'
import useGroup from 'utils/useGroup'
import Spinner from 'components/Spinner'
import { Table, TableHeader, Row } from 'components/Table'

const Students: React.FC = () => {
  const { user } = useUser()
  const groupCode = user?.group?.code

  const { group, isValidating } = useGroup(groupCode)
  const { students } = group || {}

  return (
    <Card>
      <Title>Список студентів {group?.code || user?.group?.code}</Title>

      {!students && isValidating ? (
        <Spinner />
      ) : (
        <Table>
          <thead>
            <TableHeader>
              <th>№</th>
              <th>ПІБ</th>
              <th>Статус</th>
              <th>Телефон</th>
              <th>E-mail</th>
            </TableHeader>
          </thead>
          <tbody>
            {students?.map?.(({ name, status, phone, email }, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <Row key={i}>
                <td>{i + 1}</td>
                <td>{name}</td>
                <td>{status}</td>
                <td>{phone}</td>
                <td>{email}</td>
              </Row>
            ))}
          </tbody>
        </Table>
      )}
    </Card>
  )
}

export default Students
