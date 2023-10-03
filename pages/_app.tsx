import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import axios from 'axios'

import 'styles/reset.css'
import 'styles/styles.css'

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

const value = {
  fetcher,
}

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)

  return <SWRConfig value={value}>{getLayout(<Component {...pageProps} />)}</SWRConfig>
}
