import { dbConnect } from '@utils/mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { Magic } from '@magic-sdk/admin'
import { Homeowner } from 'models/homeowner'

type NextApiRequestWithContractorInfo = Omit<NextApiRequest, 'body'> & {
  body: {
    firstName: string
    lastName: string
    phone: string
    email: string
  }
}

const magic = new Magic(process.env.MAGIC_SECRET_KEY)

const handler = async (
  req: NextApiRequestWithContractorInfo,
  res: NextApiResponse
) => {
  if (req.method === 'PATCH') {
    await dbConnect()

    const didToken = req.headers.authorization.substr(7)

    try {
      magic.token.validate(didToken)
      const metadata = await magic.users.getMetadataByToken(didToken)

      // magic stores the country code along with the phone number
      // we only support US phone numbers so we can just grab the
      // last 10 digits
      const phone = metadata.phoneNumber.slice(metadata.phoneNumber.length - 10)

      const homeowner = await Homeowner.updateOne(
        {
          phone: phone,
        },
        { ...req.body },
        { new: true }
      )

      res.status(200).json({ ...homeowner })
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Failed to update contractor personal', error })
    }
  } else {
    res.setHeader('Allow', 'PATCH')
    res.status(405).end('Method Not Allowed')
  }
}

export default handler
