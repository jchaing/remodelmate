import { NextApiRequest, NextApiResponse } from 'next'
import { Milestone } from 'models/milestone'
import { dbConnect } from '@utils/mongodb'
import { Homeowner } from 'models/homeowner'
import { Estimate } from 'models/estimate'
import { ACTIVE_BUNDLES } from '@lib/pricing/activeMarkets'
import { Layout } from '@lib/layout'

// INFO: This route doesn't need to be authenticated
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const {
    phone,
    street,
    city,
    state,
    zip,
    additional,
    place_id,
    url,
    collectionName,
    layout,
    market,
    referralCode,
  } = req.body

  const materialsPricing = {
    _category: 'materials',
    name: 'Materials',
    description: `${collectionName} materials for the ${Layout[layout]} project.`,
    price:
      ACTIVE_BUNDLES[market].materialsCollectionPricing[collectionName][layout],
    contractorPayoutAmount: 0,
  }

  const pricingBundle = [
    // Fees due at booking
    ACTIVE_BUNDLES[market].reservationFee,
    // Materials pricing depending on collection and layout
    materialsPricing,
    // Construction pricing
    ...ACTIVE_BUNDLES[market].pricingBundles[layout],
  ]

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
      const referrer = await Homeowner.findOne({ referralCode: referralCode })

      const estimate = new Estimate({
        _homeowner: homeowner._id,
        collectionName,
        layout: Layout[layout],
        address: { street, city, state, zip, additional, place_id, url },
        totalCost: calculateTotalCost(pricingBundle),
        remainingBalance: calculateTotalCost(pricingBundle),
        referralCode,
      })

      estimate.milestones = createMilestones(pricingBundle, estimate._id)

      const { firstName, lastName, email } = homeowner

      if (referralCode) {
        // store referrer as reference on estimate
        estimate._referredBy = referrer._id

        // store estimate reference on referrer
        await referrer.updateOne({$push: { referred: estimate._id }})
      }

      await estimate.save()
      await homeowner.estimates.push(estimate)
      await homeowner.save()

      return res
        .status(201)
        .json({ estimate, firstName, lastName, email, phone })
    } catch (error) {
      return res.status(400).json({ error: error })
    }
  }
  return res.json({ message: 'Route only takes POST requests' })
}

export default handler
