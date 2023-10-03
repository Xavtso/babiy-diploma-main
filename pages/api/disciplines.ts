import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { request, gql } from 'graphql-request'
import { sessionOptions } from 'utils/session'

const query = gql`
  query getDisciplines($code: String!) {
    disciplines(where: { classes: { attendances: { group_code: { _eq: $code } } } }) {
      id
      title
      classes {
        id
        title
        type
        teacher {
          id
          name
        }
      }
    }
  }
`

interface QueryData {
  disciplines: {
    id: string
    title: string
    classes: {
      id: string
      title: string
      type: string
      teacher: {
        id: string
        name: string
      }
    }[]
  }[]
}

const getDisciplines = async (code: string, token: string) => {
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

  return res?.disciplines
}

const toString = (value: string | string[]) => (Array.isArray(value) ? value[0] : value)

async function disciplinesRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req.session.user) {
    const code = toString(req.query.code)
    const { token } = req.session.user

    if (!code) {
      res.status(401).json({ message: 'Group Code is missing' })
      return
    }

    const data = await getDisciplines(code, token)

    res.json(data)
  } else {
    res.json({})
  }
}

export default withIronSessionApiRoute(disciplinesRoute, sessionOptions)
