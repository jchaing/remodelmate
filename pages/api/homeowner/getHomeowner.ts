import { dbConnect } from '@utils/mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { Homeowner } from 'models/homeowner'
import { Magic } from '@magic-sdk/admin'

const magic = new Magic(process.env.MAGIC_SECRET_KEY)

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
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

      res.status(200).json(homeowner )
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve homeowner', error })
    }
  } else {
    res.setHeader('Allow', 'GET')
    res.status(405).end('Method Not Allowed')
  }
}

export default handler
