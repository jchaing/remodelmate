import { dbConnect } from '@utils/mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { Homeowner } from 'models/homeowner'

type NextApiRequestWithContractorInfo = Omit<NextApiRequest, 'body'> & {
  body: {
    firstName: string
    lastName: string
    email: string
    phone: string
    street?: string
    city?: string
    state?: string
    zip?: number
    additional?: string
  }
}

const handler = async (
  req: NextApiRequestWithContractorInfo,
  res: NextApiResponse
) => {
  if (req.method === 'POST') {
    await dbConnect()

    const { firstName, lastName, email, phone, street, city, state, zip, additional } =
      req.body

    try {
      const homeowner = await Homeowner.create({
        firstName,
        lastName,
        email,
        phone,
        address: { street, city, state, zip, additional },
      })

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
