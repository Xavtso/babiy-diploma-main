import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { request, gql } from 'graphql-request'
import { sessionOptions } from 'utils/session'

const query = gql`
  query getToday($code: String!, $start: timestamptz, $end: timestamptz) {
    classes(
      where: { attendances: { group_code: { _eq: $code } }, _and: { start_time: { _gte: $start }, _and: { end_time: { _lte: $end } } } }
    ) {
      id
      start_time
      end_time
      discipline {
        id
        title
      }
      title
      type
    }
  }
`

interface QueryData {
  classes: {
    id: string
    start_time: string
    end_time: string
    discipline: {
      id: string
      title: string
    }
    title: string
    type: string
  }
}

const getTodaySchedule = async (code: string, start: string, end: string, token: string) => {
  const res = await request<QueryData>({
    url: process.env.ENDPOINT_API,
    document: query,
    variables: {
      code,
      start,
      end,
    },
    requestHeaders: {
      Authorization: `Bearer ${token}`,
    },
  })

  return res?.classes
}

const toString = (value: string | string[]) => (Array.isArray(value) ? value[0] : value)

async function todayRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req.session.user) {
    const code = toString(req.query.code)

    const { token } = req.session.user

    const d = new Date()

    d.setHours(0, 0, 0, 0)
    const min = d.toISOString()

    d.setHours(24, 0, 0, 0)
    const max = d.toISOString()

    if (!code) {
      res.status(401).json({ message: 'Group Code is missing' })
      return
    }

    const data = await getTodaySchedule(code, min, max, token)

    res.json(data)
  } else {
    res.json({})
  }
}

export default withIronSessionApiRoute(todayRoute, sessionOptions)
