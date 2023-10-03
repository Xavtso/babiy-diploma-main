import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { request, gql } from 'graphql-request'
import { sessionOptions } from 'utils/session'

const query = gql`
  query getDisciplineLectures($id: uuid!, $code: String!) {
    discipline(id: $id) {
      classes(where: { attendances: { group_code: { _eq: $code } } }) {
        id
        title
        type
        start_time
        end_time
        link
      }
      id
      title
    }
  }
`

interface QueryData {
  discipline: {
    id: string
    title: string
    classes: {
      id: string
      title: string
      type: string
      start_time: string
      end_time: string
      link?: string
    }[]
  }
}

const getDisciplineLectures = async (id: string, code: string, token: string) => {
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

  return res?.discipline
}

const toString = (value: string | string[]) => (Array.isArray(value) ? value[0] : value)

async function disciplineLecturesRoute(req: NextApiRequest, res: NextApiResponse) {
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

    const data = await getDisciplineLectures(id, code, token)

    res.json(data)
  } else {
    res.json({})
  }
}

export default withIronSessionApiRoute(disciplineLecturesRoute, sessionOptions)
