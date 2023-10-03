import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { request, gql } from 'graphql-request'
import { sessionOptions } from 'utils/session'

const query = gql`
  query getSchedule($code: String!, $start: timestamptz, $end: timestamptz) {
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

const getSchedule = async (code: string, start: string, end: string, token: string) => {
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

async function scheduleRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req.session.user) {
    const code = toString(req.query.code)
    const start = toString(req.query.start)
    const end = toString(req.query.end)

    const { token } = req.session.user

    if (!code) {
      res.status(401).json({ message: 'Group Code is missing' })
      return
    }

    const data = await getSchedule(code, start, end, token)

    res.json(data)
  } else {
    res.json({})
  }
}

export default withIronSessionApiRoute(scheduleRoute, sessionOptions)
