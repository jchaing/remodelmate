import { Magic } from '@magic-sdk/admin'
import { dbConnect } from '@utils/mongodb'
import { Homeowner } from 'models/homeowner'
import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  // @ts-ignore stripe-version-2022-08-01
  apiVersion: '2022-08-01',
})
const magic = new Magic(process.env.MAGIC_SECRET_KEY)

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { customerName, homeownerEmail } = req.body

  const didToken = req.headers.authorization.substr(7)
  await dbConnect()

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

  try {
    const customer = await stripe.customers.create({
      email: homeownerEmail,
      name: customerName,
    })

    const intent = await stripe.setupIntents.create({
      customer: customer.id,
      usage: 'on_session',
    })

    const client_secret = intent.client_secret
    const update = { stripeCustomerId: customer.id }

    const updatedHomeowner = await Homeowner.findOneAndUpdate(
      { email: homeownerEmail },
      update,
      { new: true }
    )

    res.status(200).json({ client_secret, updatedHomeowner })
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : 'Internal server error'
    res.status(500).json({ statusCode: 500, message: errorMessage })
  }
}

export default handler
