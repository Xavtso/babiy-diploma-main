import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { request, gql } from 'graphql-request'
import jwt from 'jsonwebtoken'

import { sessionOptions } from 'utils/session'
import type User from 'types/user'

const query = gql`
  query GetStudent($email: String!) {
    students(where: { email: { _eq: $email } }) {
      id
      email
      password
    }
  }
`

const getToken = async ({ email, password }) => {
  const res = await request({
    url: process.env.ENDPOINT_API,
    document: query,
    variables: {
      email,
    },
    requestHeaders: {
      'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET,
    },
  })

  const profile = res?.students?.[0]

  if (profile && profile.password === password) {
    const token = jwt.sign(
      {
        'https://hasura.io/jwt/claims': {
          'x-hasura-allowed-roles': ['anonymous', 'student'],
          'x-hasura-default-role': 'student',
          'x-hasura-user-id': profile.id,
        },
      },
      process.env.JWT_SHARED_SECRET,
    )
    return { token, id: profile.id }
  }

  return { token: null }
}

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      res.status(401).json({ message: 'Login or Password missing' })
      return
    }
    const { token, id } = await getToken({ email, password })
    if (!token || !id) {
      res.status(401).json({ message: 'Login or Password incorect' })
      return
    }
    const user: User = { token, email, id }
    req.session.user = user
    await req.session.save()
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
}

export default withIronSessionApiRoute(loginRoute, sessionOptions)
