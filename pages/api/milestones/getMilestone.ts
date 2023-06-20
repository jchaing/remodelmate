import { Magic } from '@magic-sdk/admin'
import { dbConnect } from '@utils/mongodb'
import { Homeowner } from 'models/homeowner'
import { Milestone } from 'models/milestone'
import { model } from 'mongoose'
import { NextApiRequest, NextApiResponse } from 'next'

const magic = new Magic(process.env.MAGIC_SECRET_KEY)

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const didToken = req.headers.authorization.substr(7)

  try {
    magic.token.validate(didToken)
    const metadata = await magic.users.getMetadataByToken(didToken)

    const phone = metadata.phoneNumber.slice(metadata.phoneNumber.length - 10)

    if (!phone) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const homeowner = await Homeowner.findOne({ phone })

    if (!homeowner) {
      res.status(400).json({ message: 'No homeowner exists' })
    }
  } catch (error) {
    return res.status(401).json({ authorized: false, error })
  }

  if (req.method === 'POST') {
    await dbConnect()

    try {
      const milestone = await Milestone.findById(req.body.id)
        .populate('_contractor')
        .populate('receipt')
        .populate('_project')
        .populate({
          path: '_project',
          populate: { path: '_homeowner', model: 'Homeowner' },
        })

      return res.status(200).json({ authorized: true, milestone })
    } catch (error) {
      res.status(500).send(error)
    }
  }

  if (req.method === 'PATCH') {
    await dbConnect()

    const { update } = JSON.parse(req.body)

    try {
      const updatedMilestone = await Milestone.findByIdAndUpdate(
        req.body.id,
        update,
        {
          new: true,
        }
      )

      return res.status(200).json({ authorized: true, updatedMilestone })
    } catch (error) {
      res.status(500).send(error)
    }
  }

  return res.json({
    authorized: false,
    message: 'This route only accepts POST and PATCH requests',
  })
}

export default handler
