import { NextApiRequest, NextApiResponse } from 'next'

const SLACK_URL = process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL

// TODO: Make own service
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req

  // INFO: This route is unprotected, so we need to check for the API key
  if (method === 'POST') {
    try {
      const appJson = 'application/json'
      const headers = { Accept: appJson, 'Content-Type': appJson }

      const postSlackMessage = await fetch(SLACK_URL, { method, headers, body })

      return res.status(201).json({postSlackMessage})
    } catch (error) {
      return res.status(400).json({ error })
    }
  }
  console.log('body', body)

  return res.status(405).json({
    authorized: false,
    message: 'This route only accepts POST requests',
  })
}

export default handler
