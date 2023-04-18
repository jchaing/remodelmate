import { NextApiRequest, NextApiResponse } from 'next'
import { Contractor } from 'models/contractor'
import { Estimate } from 'models/estimate'
import { Homeowner } from 'models/homeowner'
import { dbConnect } from '@utils/mongodb'
import { Magic } from '@magic-sdk/admin'
require('models/milestone')
require('models/receipt')
// import { dbConnect } from '../../../models'
// import { getLoginSession } from '../../../lib/auth/auth'

// const GET_ONLY = 'This route only accepts GET requests'

const magic = new Magic(process.env.MAGIC_SECRET_KEY)

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    await dbConnect()

    const didToken = req.headers.authorization.substr(7)

    try {
      if (!req.body.id) {
        return res.status(400).send({ message: 'id must be provided' })
      }

      magic.token.validate(didToken)
      const metadata = await magic.users.getMetadataByToken(didToken)

      const phone = metadata.phoneNumber.slice(metadata.phoneNumber.length - 10)

      if (!phone) {
        return res.status(401).json({ error: 'Unauthorized' })
      }

      const homeowner = await Homeowner.findOne({ phone })

      const project = await Estimate.findById(req.body.id)
        .populate({
          path: 'milestones',
          populate: [{ path: '_contractor' }, { path: 'receipt' }],
        })

      const { _contractor } = project

      if (_contractor) {
        const contractor = await Contractor.findById({ _id: _contractor })

        return res
          .status(200)
          .json({ authorized: true, project, homeowner, contractor })
      }

      return res.status(200).json({ authorized: true, project, homeowner })
    } catch (error) {
      return res.status(500).json({ authorized: false, error })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}

export default handler
