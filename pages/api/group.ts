import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { request, gql } from 'graphql-request'
import { sessionOptions } from 'utils/session'

const query = gql`
  query getGroup($code: String!) {
    group(code: $code) {
      code
      headman_id
      students(order_by: [{ is_transferred: asc_nulls_first }, { name: asc }]) {
        id
        name
        email
        phone
        status
        is_transferred
      }
      curator {
        id
        name
        phone
        email
      }
    }
  }
`

interface QueryData {
  group: {
    code: string
    headman_id: string
    students: {
      id: string
      name: string
      email: string
      phone: string
      status: string
    }[]
  }
}

const getGroup = async (code: string, token: string) => {
  const res = await request<QueryData>({
    url: process.env.ENDPOINT_API,
    document: query,
    variables: {
      code,
    },
    requestHeaders: {
      Authorization: `Bearer ${token}`,
    },
  })

  return res?.group
}

const toString = (value: string | string[]) => (Array.isArray(value) ? value[0] : value)

async function groupRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req.session.user) {
    const code = toString(req.query.code)
    const { token } = req.session.user

    if (!code) {
      res.status(401).json({ message: 'Group Code is missing' })
      return
    }

    const data = await getGroup(code, token)

    res.json(data)
  } else {
    res.json({})
  }
}

export default withIronSessionApiRoute(groupRoute, sessionOptions)
