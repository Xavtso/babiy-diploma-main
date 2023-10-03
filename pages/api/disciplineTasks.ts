import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { request, gql } from 'graphql-request'
import { sessionOptions } from 'utils/session'

const query = gql`
  query getDisciplineTasks($id: uuid!, $code: String!) {
    discipline(id: $id) {
      id
      title
    }
    tasks(where: { class: { attendances: { group_code: { _eq: $code } }, discipline_id: { _eq: $id } } }, order_by: {created_at: desc}) {
      id
      title
      description
      deadline
      uploads {
        link
        mark
      }
    }
  }
`

interface QueryData {
  discipline: {
    id: string
    title: string
    tasks: {
      id: string
      title: string
      description: string
      uploads: {
        link: string
        mark: string
      }[]
    }[]
  }
}

const getDisciplineTasks = async (id: string, code: string, token: string) => {
  const res = await request<QueryData>({
    url: process.env.ENDPOINT_API,
    document: query,
    variables: {
      id,
      code,
    },
    requestHeaders: {
      Authorization: `Bearer ${token}`,
    },
  })

  return res
}

const toString = (value: string | string[]) => (Array.isArray(value) ? value[0] : value)

async function disciplineTasksRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req.session.user) {
    const id = toString(req.query.id)
    const code = toString(req.query.code)
    const { token } = req.session.user

    if (!id) {
      res.status(401).json({ message: 'Id is missing' })
      return
    }
    if (!code) {
      res.status(401).json({ message: 'Group Code is missing' })
      return
    }

    const data = await getDisciplineTasks(id, code, token)

    res.json(data)
  } else {
    res.json({})
  }
}

export default withIronSessionApiRoute(disciplineTasksRoute, sessionOptions)
