import { Magic } from '@magic-sdk/admin'
import { dbConnect } from '@utils/mongodb'
import { Homeowner } from 'models/homeowner'
import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  // @ts-ignore stripe-version-2022-08-01
  apiVersion: '2022-08-01',
})

const POST_ONLY = 'This route only accepts POST requests'

const magic = new Magic(process.env.MAGIC_SECRET_KEY)

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  if (method === 'POST') {
    await dbConnect()
    
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

      const { stripeCustomerId } = homeowner

      const intent = await stripe.setupIntents.create({
        customer: stripeCustomerId,
        payment_method_types: ['card'],
      })

      return res.status(200).json({ client_secret: intent.client_secret })
    } catch (error) {
      return res
        .status(500)
        .json({ authorized: false, statusCode: 500, message: error.message })
    }
  }

  return res.json({ authorized: false, message: POST_ONLY })
}

export default handler
