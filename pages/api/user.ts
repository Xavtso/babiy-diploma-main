import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { request, gql } from 'graphql-request'
import { sessionOptions } from 'utils/session'
import type User from 'types/user'

const query = gql`
  query getStudent($id: uuid!) {
    student(id: $id) {
      id
      name
      email
      phone
      status
      group {
        code
      }
    }
  }
`
interface QueryData {
  student: {
    id: string
    name: string
    email: string
    phone: string
    status: string
    group?: {
      code: string
    }
  }
}

const getUser = async (id: string, token: string) => {
  const res = await request<QueryData>({
    url: process.env.ENDPOINT_API,
    document: query,
    variables: {
      id,
    },
    requestHeaders: {
      Authorization: `Bearer ${token}`,
    },
  })

  return res?.student
}

async function userRoute(req: NextApiRequest, res: NextApiResponse<User>) {
  if (req.session.user) {
    const { token, id } = req.session.user

    const userData = (await getUser(id, token)) || {}

    res.json({
      ...req.session.user,
      ...userData,
    })
  } else {
    res.json({})
  }
}

export default withIronSessionApiRoute(userRoute, sessionOptions)
