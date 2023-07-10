import { dbConnect } from '@utils/mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { Homeowner } from 'models/homeowner'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    await dbConnect()

    const { referralCode } = req.body

    try {
      const existingHomeownerWithCode = await Homeowner.findOne({
        referralCode,
      })

      if (!existingHomeownerWithCode) {
        return res.status(400).json({ referralCode: 'invalid' })
      }

      res.status(200).json({ referralCode: 'Valid' })
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Failed to validate referral code', error })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}

export default handler
