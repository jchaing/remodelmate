import { NextApiRequest, NextApiResponse } from 'next'
import { Milestone } from 'models/milestone'
import { dbConnect } from '@utils/mongodb'
import { Homeowner } from 'models/homeowner'
import { Estimate } from 'models/estimate'
import { ACTIVE_BUNDLES } from '@lib/pricing/activeMarkets'

// INFO: This route doesn't need to be authenticated
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req
  const { phone, street, city, state, zip, place_id, url, layout, market } =
    req.body

  const pricingBundle = ACTIVE_BUNDLES[market].pricingBundles[layout]

  function createMilestones(bundle: any, projectId: any) {
    const milestones = []
    bundle.forEach((milestone: any) => {
      milestones.push(
        new Milestone({
          _project: projectId,
          ...milestone,
        })
      )
    })
    milestones.forEach((milestone) => milestone.save())
    return milestones
  }

  function calculateTotalCost(bundle: any) {
    let totalCost = 0
    bundle.forEach((milestone: any) => {
      totalCost += milestone.price
    })
    return totalCost
  }

  if (method === 'POST') {
    await dbConnect()

    try {
      const homeowner = await Homeowner.findOne({ phone: phone })
      const estimate = new Estimate({
        _homeowner: homeowner._id,
        address: { street, city, state, zip, place_id, url },
        totalCost: calculateTotalCost(pricingBundle),
        remainingBalance: calculateTotalCost(pricingBundle),
      })

      estimate.milestones = createMilestones(pricingBundle, estimate._id)

      await estimate.save()
      await homeowner.estimates.push(estimate)
      await homeowner.save()

      return res.status(201).json(estimate)
    } catch (error) {
      return res.status(400).json({ error: error })
    }
  }
  return res.json({ message: 'Route only takes POST requests' })
}

export default handler
