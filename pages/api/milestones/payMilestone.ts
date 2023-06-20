import { NextApiRequest, NextApiResponse } from 'next'
import { Magic } from '@magic-sdk/admin'
import { Homeowner } from 'models/homeowner'
import { dbConnect } from '@utils/mongodb'
import { Milestone } from 'models/milestone'
import { Estimate } from 'models/estimate'
import { Receipt } from 'models/receipt'
import { ServerClient } from 'postmark'
require('models/contractor')

const magic = new Magic(process.env.MAGIC_SECRET_KEY)

const client = new ServerClient(process.env.NEXT_PUBLIC_POSTMARK_SERVER_TOKEN)

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

      const { milestoneStatus, projectId, stripeReceipt, id } = body

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
        { new: true }
      )

      const updatedProject = await Estimate.findByIdAndUpdate(
        projectId,
        projectUpdates,
        { new: true }
      )

      // Send email to contractor
      const {
        name,
        description,
        price,
        contractorPercentage,
        contractorPayoutAmount,
      } = updatedMilestone
      const { _id, collectionName, layout, _homeowner } = project
      const { _contractor } = milestone

      if (_contractor) {
        try {
          const calculateContractorPayoutAmount = (
            milestonePrice: number,
            contractorPercentage: number
          ) => {
            return ((milestonePrice / 100) * contractorPercentage).toFixed(2)
          }

          const emailData = {
            project: collectionName ? `${collectionName} - ${layout}` : _id,
            milestoneName: name,
            milestoneDescription: description,
            homeownerFullName: `${_homeowner.firstName} ${_homeowner.lastName}`,
            contractorFirstName: _contractor.firstName,
            contractorPayoutAmount: contractorPayoutAmount
              ? contractorPayoutAmount
              : calculateContractorPayoutAmount(price, contractorPercentage),
          }

          await client.sendEmailWithTemplate({
            From: 'contractors@remodelmate.com',
            To: _contractor.email,
            TemplateAlias: 'milestone-payment-confirmation',
            TemplateModel: emailData,
          })

        } catch (error) {
          console.error(error)
        }
      }

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
