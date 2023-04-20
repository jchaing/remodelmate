import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import { dbConnect } from '@utils/mongodb'
import { Homeowner } from 'models/homeowner'
import { Magic } from '@magic-sdk/admin'

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY
const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2022-11-15' })

const magic = new Magic(process.env.MAGIC_SECRET_KEY)

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  if (method === 'GET') {
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

      const paymentMethodsObject = await stripe.paymentMethods.list({
        customer: stripeCustomerId,
        type: 'card',
      })

      const paymentMethod = paymentMethodsObject.data[0].card

      return res.status(200).json(paymentMethod)
    } catch (error) {
      return res.status(500).json({ authorized: false, message: error.message })
    }
  }
  return res.json({
    authorized: false,
    message: 'This route only accepts GET requests',
  })
}

export default handler
