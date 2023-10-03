import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from 'utils/session'
import type User from 'types/user'

function logoutRoute(req: NextApiRequest, res: NextApiResponse<User>) {
  req.session.destroy()
  res.json({})
}

export default withIronSessionApiRoute(logoutRoute, sessionOptions)
