import mongoose, { Document, Schema } from 'mongoose'
import validator from 'validator'
import { Estimate as _Estimate } from 'models/estimate'

// Enums:
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
// TODO:
const categoriesArray = ['general', 'design']
const statusArray = ['pending', 'approved', 'declined']
const backgroundCheckArray = ['notStarted', 'passed']

// @ts-expect-error hack to fix this in local dev
delete mongoose.connection.models['Contractor'] // prevents `OverwriteModelError`

interface Contractor extends Document {
  [key: string]: any
}

const contractorSchema = new Schema<Contractor>({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value: any) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid')
      }
    },
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    validate(value: any) {
      if (!validator.isMobilePhone) {
        throw new Error(`${value} is not a valid 10 digit number!`)
      }
    },
  },
  personalAddress: {
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
      uppercase: true,
      enum: statesArray,
    },
    zip: {
      type: Number,
    },
    additional: {
      type: String,
      trim: true,
    },
  },

  description: {
    type: String,
  },
  profileImage: {
    type: String,
  },

  companyName: {
    type: String,
  },
  companyAddress: {
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
      uppercase: true,
      enum: statesArray,
    },
    zip: {
      type: Number,
    },
    additional: {
      type: String,
      trim: true,
    },
  },

  contractorsLicense: [
    {
      licenseImage: {
        type: String,
        required: true,
      },
      licenseNumber: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        uppercase: true,
        enum: statesArray,
      },
      expirationDate: {
        type: Date,
      },
      licenseVerified: {
        type: Boolean,
        required: true,
        default: false,
      },
      status: {
        type: String,
        required: true,
        enum: statusArray,
        default: 'pending',
      },
    },
  ],

  localLicense: [
    {
      licenseImage: { type: String },
      companyName: { type: String },
      licenseCity: { type: String },
      licenseCode: { type: String },
      licenseNumber: { type: String },
      commercialActivityLicense: { type: String },
      dateIssued: { type: Date },
      dateExpire: { type: Date },
      dateCreated: { type: Date, default: Date.now() },
      licenseVerified: {
        type: Boolean,
        default: false,
      },
      status: {
        type: String,
        enum: statusArray,
        default: 'pending',
      },
    },
  ],

  insurancePolicy: [
    {
      insuranceImage: {
        type: String,
        required: true,
      },
      policyNumber: {
        type: String,
        required: true,
      },
      expirationDate: {
        type: Date,
      },
      insuranceVerified: {
        type: Boolean,
        required: true,
        default: false,
      },
      status: {
        type: String,
        required: true,
        enum: statusArray,
        default: 'pending',
      },
    },
  ],
  backgroundCheckStatus: {
    type: String,
    required: true,
    enum: backgroundCheckArray,
    default: 'notStarted',
  },
  activated: {
    type: Boolean,
    required: true,
    default: false,
  },

  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Estimate',
    },
  ],
  stripeContractorId: {
    type: String,
    // TODO: MIGHT WANT TO CHANGE THIS LATER BUT NOT SURE YET
    // unique: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
  category: {
    type: String,
    required: true,
    enum: categoriesArray,
    default: 'general',
  },
})

export const Contractor = mongoose.model<Contractor>(
  'Contractor',
  contractorSchema
)

export default Contractor
