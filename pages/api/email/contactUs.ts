import { NextApiRequest, NextApiResponse } from 'next'
import { ServerClient } from 'postmark'

type NextApiRequestWithPrProspectInfo = Omit<NextApiRequest, 'body'> & {
  body: {
    firstName: string
    lastName: string
    email: string
    phone: string
    message: string
  }
}

const client = new ServerClient(process.env.NEXT_PUBLIC_POSTMARK_SERVER_TOKEN)

const handler = async (
  req: NextApiRequestWithPrProspectInfo,
  res: NextApiResponse
) => {
  if (req.method === 'POST') {
    try {
      const contactUsRes = await client.sendEmailWithTemplate({
        From: 'support@remodelmate.com',
        To: req.body.email,
        TemplateAlias: 'contact-us',
        TemplateModel: req.body,
      })

      res.status(200).json({ ...contactUsRes })
    } catch (error) {
      res.status(500).json({ message: 'Failed to send message', error })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}

export default handler