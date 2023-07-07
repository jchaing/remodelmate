import { dbConnect } from '@utils/mongodb'
import { Magic } from '@magic-sdk/admin'
import { NextApiRequest, NextApiResponse } from 'next'
import { Homeowner } from 'models/homeowner'

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

      if (homeowner.referralCode === req.body.referralCode) {
        return res.status(400).json({ referralCode: 'invalid' })
      }

      res.status(200).json({ referralCode: 'Valid' })
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Failed to check own referral code', error })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}

export default handler
