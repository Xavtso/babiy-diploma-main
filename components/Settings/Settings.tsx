import React from 'react'
import Card, { Title } from 'components/Card'
import useUser from 'utils/useUser'
import useGroup from 'utils/useGroup'
import { Content, Body, Footer } from './styles'

const Settings: React.FC = () => {
  const { user } = useUser()
  const { name, email } = user || {}
  const { group } = useGroup(user?.group?.code)
  return (
    <Card>
      <Title>Налаштування</Title>

      <Content>
        <Body>
          <div>
            <strong>Студент:</strong> {name || '-'}
          </div>
          <div>
            <strong>Група:</strong> {group?.code || '-'}
          </div>
          <div>
            <strong>Куратор:</strong> {group?.curator?.name || '-'}
          </div>
          <div>
            <strong>Пошта студента:</strong> {email || '-'}
          </div>
        </Body>

        <Footer>
          <a href="mailto:i.babiy@artk.ai">Звернутись щодо зміни особистої інформації</a>
        </Footer>
      </Content>
    </Card>
  )
}

export default Settings
