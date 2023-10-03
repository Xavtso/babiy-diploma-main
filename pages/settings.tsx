import type { ReactElement } from 'react'
import Layout from 'components/Layout'
import Settings from 'components/Settings'

const SettingsPage = () => <Settings />

SettingsPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export default SettingsPage
