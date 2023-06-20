import { dbConnect } from '@utils/mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { Homeowner } from 'models/homeowner'

type NextApiRequestWithPhone = Omit<NextApiRequest, 'body'> & {
  body: {
    phone: string
  }
}

const handler = async (req: NextApiRequestWithPhone, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { phone } = req.body

    if (!req.body.phone) {
      res.status(400).json({ message: 'Missing phone value' })
    }

    await dbConnect()

    try {
      const homeowner = await Homeowner.findOne({ phone }).lean()

      // Some homeowners have their phone number stored as a string
      // and some as a number. This is a temporary fix to allow
      // both types to be checked.This is due to the different versions of 
      // the old homeowner app
      const numberType = await Homeowner.findOne({
        phone: Number(phone),
      }).lean()

      if (homeowner || numberType) {
        res.status(200).json({ success: true })
      } else {
        res.status(400).json({ success: false })
      }
    } catch (error) {
      res.status(500).json({ message: 'failed' })
      throw error
    }
  } else {
    res.setHeader('Allow', 'GET')
    res.status(405).end('Method Not Allowed')
  }
}

export default handler
