import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { request, gql } from 'graphql-request'
import { sessionOptions } from 'utils/session'

const query = gql`
  mutation uploadLink($link: String!, $student_id: uuid!, $task_id: uuid!) {
    insert_upload(object: { link: $link, student_id: $student_id, task_id: $task_id }) {
      student_id
      task_id
      link
      mark
    }
  }
`

interface QueryData {
  insert_upload: {
    student_id: string
    task_id: string
    link: string
    mark: string
  }
}

const uploadTask = async (studentId: string, taskId: string, link: string, token: string) => {
  const res = await request<QueryData>({
    url: process.env.ENDPOINT_API,
    document: query,
    variables: {
      student_id: studentId,
      task_id: taskId,
      link,
    },
    requestHeaders: {
      Authorization: `Bearer ${token}`,
    },
  })

  return res
}

const toString = (value: string | string[]) => (Array.isArray(value) ? value[0] : value)

async function uploadRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req.session.user) {
    const taskId = toString(req.body.task_id)
    const link = toString(req.body.link)
    const { id: studentId, token } = req.session.user

    if (!studentId) {
      res.status(401).json({ message: 'User Id is missing' })
      return
    }
    if (!taskId) {
      res.status(401).json({ message: 'Task Id is missing' })
      return
    }
    if (!link) {
      res.status(401).json({ message: 'Link is missing' })
      return
    }

    try {
      const data = await uploadTask(studentId, taskId, link, token)
      res.json(data)
    } catch (e) {
      res.status(401).json(e?.response?.errors?.[0] || e)
    }
  } else {
    res.json({})
  }
}

export default withIronSessionApiRoute(uploadRoute, sessionOptions)
