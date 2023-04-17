import { Magic } from '@magic-sdk/admin'
import { dbConnect } from '@utils/mongodb'
import { Estimate } from 'models/estimate'
import { Homeowner } from 'models/homeowner'
import { NextApiRequest, NextApiResponse } from 'next'

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
        return res.status(401).json({ error: 'Unauthorized' })
      }

      const { estimates } = await Homeowner.findOne({ phone })
      
      const projects = await Estimate.find({ _id: { $in: estimates } })

      return res.status(200).json(projects)
    } catch (error) {
      return res.status(500).json({ message: 'Failed to get projects', error })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}

export default handler