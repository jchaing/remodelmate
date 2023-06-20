import { Magic } from '@magic-sdk/admin'
import { dbConnect } from '@utils/mongodb'
import { Estimate } from 'models/estimate'
import { Homeowner } from 'models/homeowner'
import { Milestone } from 'models/milestone'
import { Receipt } from 'models/receipt'
import { NextApiRequest, NextApiResponse } from 'next'

const PATCH_ONLY = 'This route only accepts PATCH requests'

const magic = new Magic(process.env.MAGIC_SECRET_KEY)

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req

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

  if (method === 'PATCH') {
    await dbConnect()

    const {
      milestoneId: _milestone,
      projectId: _project,
      stripeReceipt: link,
      milestoneStatus: status,
    } = await JSON.parse(body)

    try {
      const { price } = await Milestone.findById({ _id: _milestone })
      const { remainingBalance } = await Estimate.findById({ _id: _project })

      const receipt = new Receipt({ _milestone, _project, link })
      await receipt.save()

      const projectUpdates = {
        $addToSet: { receipts: receipt },
        activated: true,
        remainingBalance: remainingBalance - price,
      }
      const milestoneUpdates = { status, receipt }

      const updatedProject = await Estimate.findByIdAndUpdate(
        _project,
        projectUpdates,
        { new: true }
        // (err, project) => (err ? err : project)
      )
      const updatedMilestone = await Milestone.findByIdAndUpdate(
        _milestone,
        milestoneUpdates,
        { new: true }
        // (err, milestone) => (err ? err : milestone)
      )

      return res
        .status(200)
        .json({ authorized: true, updatedProject, updatedMilestone })
    } catch (error) {
      return res.status(500).json({ authorized: false, error })
    }
  }
  return res.json({ authorized: false, message: PATCH_ONLY })
}

export default handler
