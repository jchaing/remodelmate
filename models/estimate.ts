import mongoose, { Document, Schema } from 'mongoose'
// import Receipt from './Receipt'
// import Milestone from './Milestone'
// import validator from 'validator'

// TODO: MOVE THIS OUT INTO A UTILITIES FOLDER OR SOMETHING
const statesArray = [
  'AL',
  'AK',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DC',
  'DE',
  'FL',
  'GA',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'OH',
  'OK',
  'OR',
  'PA',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY',
]

// @ts-expect-error hack to fix this in local dev
delete mongoose.connection.models['Estimate'] // prevents `OverwriteModelError`

interface Estimate extends Document {
  [key: string]: any
}

const estimateSchema = new Schema<Estimate>({
  _homeowner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Homeowner',
  },

  _contractor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contractor',
  },

  collectionName: {
    type: String,
  },

  layout: {
    type: String,
  },

  address: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      uppercase: true,
      required: true,
      enum: statesArray,
    },
    zip: {
      type: Number,
      required: true,
    },
    place_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    additional: {
      type: String,
      trim: true,
    },
  },

  milestones: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Milestone',
      required: true,
    },
  ],

  receipts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Receipt',
    },
  ],

  activated: {
    type: Boolean,
    required: true,
    default: false,
  },

  completed: {
    type: Boolean,
    required: true,
    default: false,
  },

  totalCost: {
    type: Number,
    required: true,
  },

  remainingBalance: {
    type: Number,
    required: true,
  },

  _referredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Homeowner',
  },

  referralCode: {
    type: String,
    trim: true,
  },

  dateCreated: {
    type: Date,
    default: Date.now,
  },
})

export const Estimate = mongoose.model('Estimate', estimateSchema)

export default Estimate
