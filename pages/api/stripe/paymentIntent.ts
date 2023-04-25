import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import { formatAmountForStripe } from '@utils/stripe'
import { dbConnect } from '@utils/mongodb'
import { Milestone } from 'models/milestone'

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY

// This is for version 2022-11-15 removing the "charges" property which contains
// the receipt_url
// @ts-ignore stripe-version-2022-08-01
const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2022-08-01' })

const calculateContractorPayoutAmount = (
  milestonePrice: number,
  contractorPercentage: number
) => {
  return ((milestonePrice / 100) * contractorPercentage).toFixed(2)
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req

  if (method === 'POST') {
    await dbConnect()

    const { milestoneId, homeownerEmail, customerName, customerId } = await body

    if (!customerId) {
      try {
        const stripe_customer = await stripe.customers.create({
          email: homeownerEmail,
          name: customerName,
        })

        const setup_intent = await stripe.setupIntents.create({
          customer: stripe_customer.id,
          usage: 'on_session',
        })

        res.status(200).json(setup_intent)
      } catch (error) {
        res.status(500).json({ statusCode: 500, message: error.message })
      }
    }

    const milestone = await Milestone.findById(milestoneId).populate({
      path: '_contractor',
    })

    const {
      price,
      _contractor,
      name: milestoneName,
      contractorPercentage,
    } = await milestone

    if (_contractor) {
      try {
        const { stripeContractorId: connected_account_id } = await _contractor

        const stripe_customer: any = await stripe.customers.retrieve(customerId)
        const payment_methods = await stripe.paymentMethods.list({
          customer: stripe_customer.id,
          type: 'card',
        })

        // TODO: UPDATE WHEN WE WANT TO DISPLAY MULTIPLE PAYMENT METHODS TO HOMEOWNERS
        const payment_method = payment_methods.data[0].id

        const milestonePrice = formatAmountForStripe(price)
        const contractorPayoutAmount = formatAmountForStripe(
          Number(calculateContractorPayoutAmount(price, contractorPercentage))
        )
        const applicationFeeAmount = milestonePrice - contractorPayoutAmount

        const paymentIntentOptions = {
          amount: milestonePrice,
          currency: 'usd',
          description: milestoneName,
          customer: stripe_customer.id,
          payment_method: payment_method,
          receipt_email: homeownerEmail,
          off_session: false,
          confirm: true,
          application_fee_amount: applicationFeeAmount,
          transfer_data: {
            destination: connected_account_id,
          },
        }

        const payment_intent = await stripe.paymentIntents.create(
          paymentIntentOptions
        )

        const transfersListOptions = {
          destination: connected_account_id,
          transfer_group: payment_intent.transfer_group,
        }

        const transfers_list = await stripe.transfers.list(transfersListOptions)
        const payment_id = transfers_list.data[0].destination_payment

        // const updatedPaymentWithDescription = await stripe.charges.update(
        //   payment_id as string,
        //   {
        //     description: milestoneName,
        //     metadata: {
        //       customerId: stripe_customer.id,
        //       customerEmail: stripe_customer.email,
        //     },
        //   },
        //   { stripeAccount: connected_account_id }
        // )

        await stripe.charges.update(
          payment_id as string,
          {
            description: milestoneName,
            metadata: {
              customerId: stripe_customer.id,
              customerEmail: stripe_customer.email,
            },
          },
          { stripeAccount: connected_account_id }
        )

        res.status(200).json(payment_intent)
      } catch (error) {
        res.status(500).json({ statusCode: 500, message: error.message })
      }
    } else {
      try {
        const stripe_customer = await stripe.customers.retrieve(customerId)

        const payment_methods = await stripe.paymentMethods.list({
          customer: stripe_customer.id,
          type: 'card',
        })

        // TODO: UPDATE WHEN WE WANT TO DISPLAY MULTIPLE PAYMENT METHODS TO HOMEOWNERS
        const payment_method = payment_methods.data[0].id

        const { price } = await Milestone.findById(milestoneId)
        const milestonePrice = formatAmountForStripe(price)
        const paymentIntentOptions = {
          amount: milestonePrice,
          currency: 'usd',
          description: milestoneName,
          customer: stripe_customer.id,
          payment_method: payment_method,
          receipt_email: homeownerEmail,
          off_session: false,
          confirm: true,
        }

        const payment_intent = await stripe.paymentIntents.create(
          paymentIntentOptions
        )
        res.status(200).json(payment_intent)
      } catch (error) {
        res.status(500).json({ statusCode: 500, message: error.message })
      }
    }
  }
}

export default handler
