export const LOGIN_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://homeowner.remodelmate.com'
    : 'https://staging.homeowner.remodelmate.com'

export const ESTIMATE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://homeowner.remodelmate.com/estimate/1'
    : 'https://staging.homeowner.remodelmate.com/estimate/1'

export const CONTRACTOR_URL = 'https://contractor.remodelmate.com'
export const ADMIN_URL = 'https://admin.remodelmate.com'
