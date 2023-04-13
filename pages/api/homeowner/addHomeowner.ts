import { dbConnect } from '@utils/mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { Homeowner } from 'models/homeowner'

type NextApiRequestWithContractorInfo = Omit<NextApiRequest, 'body'> & {
  body: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }
}

const handler = async (
  req: NextApiRequestWithContractorInfo,
  res: NextApiResponse
) => {
  if (req.method === 'POST') {
    await dbConnect()

    try {
      const homeowner = await Homeowner.create(req.body)

      res.status(200).json({ ...homeowner })
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Failed to create homeowner account', error })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}

export default handler
