/* eslint-disable import/prefer-default-export */
import { WASHINGTON_DC } from './markets/washington_dc'
// import { PHILADELPHIA_PA } from './markets/philadelphia_pa'

export const ACTIVE_MARKETS = [WASHINGTON_DC]

export const ACTIVE_ZIP_CODES = [
  ...WASHINGTON_DC.zipCodes,
  // ...PHILADELPHIA_PA.zipCodes,
  // ...NEW_REGION.zipCodes,
]

export const ACTIVE_BUNDLES = {
  WASHINGTON_DC,
  // PHILADELPHIA_PA,
}
