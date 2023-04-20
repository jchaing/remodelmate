import { NextApiRequest, NextApiResponse } from 'next'
import { Magic } from '@magic-sdk/admin'
import { Homeowner } from 'models/homeowner'
import { dbConnect } from '@utils/mongodb'
import { Milestone } from 'models/milestone'
import { Estimate } from 'models/estimate'
import { Receipt } from 'models/receipt'

// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
//   ? process.env.NEXT_PUBLIC_BASE_URL
//   : `https://${process.env.VERCEL_URL}`

const magic = new Magic(process.env.MAGIC_SECRET_KEY)

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req

  if (method === 'PATCH') {
    await dbConnect()

    const didToken = req.headers.authorization.substr(7)

    try {
      magic.token.validate(didToken)
      const metadata = await magic.users.getMetadataByToken(didToken)

      // magic stores the country code along with the phone number
      // we only support US phone numbers so we can just grab the
      // last 10 digits
      const phone = metadata.phoneNumber.slice(metadata.phoneNumber.length - 10)

      if (!phone) {
        return res.status(401).json({ error: 'Unauthorized' })
      }

      const homeowner = await Homeowner.findOne({ phone })

      if (!homeowner) {
        res.status(400).json({ message: 'No homeowner exists' })
      }

      const { milestoneStatus, projectId, stripeReceipt, id } = JSON.parse(body)

      const milestone = await Milestone.findById(id).populate({
        path: '_contractor',
      })

      const project = await Estimate.findById(projectId).populate({
        path: '_homeowner',
      })

      const receipt = await Receipt.create({
        _milestone: id,
        _project: project,
        link: stripeReceipt,
      })

      const projectUpdates = {
        $addToSet: { receipts: receipt },
        remainingBalance: project.remainingBalance - milestone.price,
      }

      const milestoneUpdates = {
        status: milestoneStatus,
        receipt: receipt,
      }
      const updatedMilestone = await Milestone.findByIdAndUpdate(
        id,
        milestoneUpdates,
        { new: true },
        // (err, milestone) => (err ? err : milestone)
      )

      const updatedProject = await Estimate.findByIdAndUpdate(
        projectId,
        projectUpdates,
        { new: true },
        // (err, project) => (err ? err : project)
      )

      // TODO: send email to contractor
      // const { name, description, price, contractorPercentage } =
      //   updatedMilestone
      // const { _id, _homeowner } = await project
      // const { _contractor } = await milestone

      // if (_contractor) {
      //   try {
      //     const calculateContractorPayoutAmount = (
      //       milestonePrice: number,
      //       contractorPercentage: number
      //     ) => {
      //       return ((milestonePrice / 100) * contractorPercentage).toFixed(2)
      //     }

      //     const emailData = {
      //       estimateId: _id,
      //       milestoneName: name,
      //       milestoneDescription: description,
      //       milestonePrice: price,
      //       homeownerEmail: _homeowner.email,
      //       homeownerFirstName: _homeowner.firstName,
      //       homeownerFullName: `${_homeowner.firstName} ${_homeowner.lastName}`,
      //       contractorEmail: _contractor.email,
      //       contractorFirstName: _contractor.firstName,
      //       contractorFullName: `${_contractor.firstName} ${_contractor.lastName}`,
      //       contractorPayoutAmount: calculateContractorPayoutAmount(
      //         price,
      //         contractorPercentage
      //       ),
      //     }

      //     const EMAIL_URL = `${BASE_URL}/api/aws/email/milestone-approval-notification`
      //     const emailRequest = await fetch(EMAIL_URL, {
      //       method: 'POST',
      //       body: JSON.stringify(emailData),
      //     })

      //     await emailRequest.json()
      //   } catch (error) {
      //     throw error
      //   }
      // }

      return res
        .status(200)
        .json({ authorized: true, updatedProject, updatedMilestone })
    } catch (error) {
      return res.status(500).json({ authorized: false, error })
    }
  }

  return res.json({
    authorized: false,
    message: 'This route only accepts PATCH requests',
  })
}

export default handler
