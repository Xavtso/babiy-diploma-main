import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { request, gql } from 'graphql-request'
import { sessionOptions } from 'utils/session'

const query = gql`
  query getTasks($userId: uuid!) {
    tasks(where: { class: { attendances: { group: { students: { id: { _eq: $userId } } } } }, _and: { _not: { uploads: {} } } }) {
      id
      title
      description
      deadline
      class {
        id
        title
        discipline {
          id
          title
        }
      }
    }
  }
`

interface QueryData {
  tasks: {
    id: string
    title: string
    description: string
    deadline: string
    class?: {
      id: string
      title: string
      discipline?: {
        id: string
        title: string
      }
    }
  }[]
}

const getTasks = async (userId: string, token: string) => {
  const res = await request<QueryData>({
    url: process.env.ENDPOINT_API,
    document: query,
    variables: {
      userId,
    },
    requestHeaders: {
      Authorization: `Bearer ${token}`,
    },
  })

  return res?.tasks
}

const toString = (value: string | string[]) => (Array.isArray(value) ? value[0] : value)

async function tasksRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req.session.user) {
    const id = toString(req.query.id)
    const { token } = req.session.user

    if (!id) {
      res.status(401).json({ message: 'User Id is missing' })
      return
    }

    const data = await getTasks(id, token)

    res.json(data)
  } else {
    res.json({})
  }
}

export default withIronSessionApiRoute(tasksRoute, sessionOptions)
