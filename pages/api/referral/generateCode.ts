import { dbConnect } from '@utils/mongodb'
import { Magic } from '@magic-sdk/admin'
import { NextApiRequest, NextApiResponse } from 'next'
import { Homeowner } from 'models/homeowner'
import { generate } from 'referral-codes'

const magic = new Magic(process.env.MAGIC_SECRET_KEY)

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    await dbConnect()

    const didToken = req.headers.authorization.substr(7)

    try {
      magic.token.validate(didToken)
      const metadata = await magic.users.getMetadataByToken(didToken)

      const phone = metadata.phoneNumber.slice(metadata.phoneNumber.length - 10)

      if (!phone) {
        return res.status(500).send({ message: 'Please sign in' })
      }

      const homeowner = await Homeowner.findOne({ phone })

      if (!homeowner) {
        res.status(400).json({ message: 'No homeowner exists' })
      }

      const code = generate({
        length: 8,
        count: 1,
        prefix: 'REMODELMATE-',
        charset: '0123456789',
      })[0]

      const existingHomeownerWithCode = await Homeowner.findOne({
        referralCode: code,
      })

      if (existingHomeownerWithCode) {
        // If code already exists, generate a new one recursively
        return handler(req, res)
      }

      await homeowner.updateOne({ referralCode: code })

      res.status(200).json({ code })
    } catch (error) {
      res.status(500).json({ message: 'Failed to generate code', error })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}

export default handler
