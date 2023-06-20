/* eslint-disable import/prefer-default-export */

// MARKET
const name = 'WASHINGTON_DC'

// ACTIVE ZIPS
const zipCodes = [
  20001, 20002, 20003, 20004, 20005, 20006, 20007, 20008, 20009, 20010, 20011,
  20012, 20015, 20016, 20017, 20018, 20019, 20020, 20024, 20032, 20036, 20037,
  20045, 20260, 20374, 20376, 20388, 20391, 20398, 20500, 20707, 20777, 20812,
  20814, 20815, 20816, 20817, 20818, 20832, 20833, 20837, 20838, 20839, 20841,
  20842, 20850, 20851, 20852, 20853, 20854, 20855, 20860, 20861, 20862, 20866,
  20868, 20871, 20872, 20874, 20876, 20877, 20878, 20879, 20882, 20886, 20889,
  20892, 20894, 20895, 20899, 20901, 20902, 20903, 20904, 20905, 20906, 20910,
  20912, 21771, 21797, 22202, 22201, 22204, 22203, 22205, 22209, 22207, 22213,
  22212, 22217, 22225, 22227, 22230, 28031, 28035, 28036, 28070, 28078, 28106,
  28105, 28130, 28134, 28202, 28201, 28204, 28203, 28206, 28205, 28208, 28207,
  28210, 28209, 28212, 28211, 28214, 28213, 28216, 28215, 28218, 28217, 28220,
  28222, 28221, 28224, 28223, 28227, 28226, 28229, 28230, 28233, 28235, 28236,
  28242, 28246, 28255, 28256, 28262, 28266, 28265, 28270, 28269, 28271, 28273,
  28277, 28278, 28282, 28284, 28287, 28290, 28299, 20711, 20714, 20724, 20733,
  21240, 20751, 20754, 20755, 20758, 20765, 20764, 21401, 21403, 21402, 21405,
  20776, 21404, 20779, 20778, 21409, 20794, 21012, 21032, 21035, 21037, 21056,
  21054, 21060, 21062, 21061, 21077, 21076, 21090, 21108, 21106, 21113, 21114,
  21122, 21123, 21144, 21140, 21146, 20705, 20704, 20707, 20706, 20709, 20708,
  20710, 20712, 20716, 20715, 20718, 20717, 20720, 20719, 20722, 20721, 20725,
  20731, 20735, 20737, 20740, 20738, 20742, 20741, 20744, 20743, 20746, 20745,
  20748, 20747, 20750, 20749, 20752, 20753, 20757, 20762, 20768, 20771, 20770,
  20773, 20772, 20775, 20774, 20782, 20781, 20784, 20783, 20785, 20792, 20791,
  20607, 20608, 20613, 20623, 21219, 21221, 21220, 21235, 21241, 21250, 21244,
  21282, 21286, 21013, 21022, 21020, 21027, 21023, 21031, 21030, 21051, 21053,
  21052, 21057, 21071, 21074, 21082, 21087, 21092, 21094, 21093, 21102, 21105,
  21104, 21111, 21117, 21120, 21128, 21131, 21133, 21139, 21136, 21153, 21152,
  21155, 21156, 21162, 21161, 21163, 21204, 21202, 21205, 21206, 21207, 21208,
  21209, 21210, 21211, 21212, 21213, 21214, 21215, 21216, 21217, 21218, 21222,
  21223, 21224, 21225, 21226, 21227, 21228, 21229, 21230, 21231, 21234, 21236,
  21237, 21239, 21251, 20001, 20170, 20171, 20190, 20191, 20194, 22033, 22042,
  22043, 22044, 22046, 22066, 22101, 22102, 22124, 22180, 22181, 22182, 22304,
  22305, 22312, 22314, 28104, 22206, 22311, 22151, 22315, 22202, 22302, 22301,
  22303, 22307, 22306, 22310,
]

// PRICING BUNDLES/LAYOUT TYPES
const powderRoom = [
  // REMOVE
  {
    _category: 'bathroom',
    name: 'Remove Toilet',
    description:
      'Labor to remove a toilet. Disconnect the water supply and drain the unit. Remove mounting fasteners. Remove the toilet from the home and dispose of it legally.',
    price: 139,
    contractorPayoutAmount: 121,
  },
  {
    _category: 'bathroom',
    name: 'Remove Vanity',
    description:
      'Labor to remove a bathroom vanity. Detach from adjacent surfaces. Remove the vanity from the home and dispose of it legally.',
    price: 355,
    contractorPayoutAmount: 309,
  },
  {
    _category: 'bathroom',
    name: 'Remove Flooring',
    description:
      'Labor to remove one layer of bathroom floor tile on a wooden subfloor. Detach floor tile, mortar, and backing surface from the wooden subfloor. Remove floor tile from the home and dispose of it legally.',
    price: 345,
    contractorPayoutAmount: 300,
  },
  // INSTALL
  {
    _category: 'bathroom',
    name: 'Install Toilet',
    description:
      'Labor to install a toilet. Fit and secure new customer-purchased toilet. Connect to the existing water supply. Drain and leak test.',
    price: 368,
    contractorPayoutAmount: 320,
  },
  {
    _category: 'bathroom',
    name: 'Install Vanity',
    description:
      'Labor to install a bathroom vanity. Fabricate plumbing cutouts in the back panel. Level and secure customer-purchased vanity to the wall. Scribe, caulk, or apply molding at the exposed panel edge. Assemble and install drawers and hardware. Connect faucet and drain to existing plumbing connections. Install mirror or medicine cabinet.',
    price: 970,
    contractorPayoutAmount: 845,
  },
  {
    _category: 'bathroom',
    name: 'Install Flooring',
    description: `Labor to install the bathroom floor tile. Measure, fabricate, and secure contractor-purchased tile backer board to the subfloor. Dry-lay the tile pattern and confirm with the homeowner. Install customer-purchased tile with customer-purchased mortar, grout, caulk, and edge transition pieces.`,
    price: 918,
    contractorPayoutAmount: 799,
  },
  {
    _category: 'bathroom',
    name: 'Install Light',
    description:
      'Labor to install vanity light fixture. Mark the location, confirm with the homeowner, and cut the mounting hole. Wire from existing switched lighting circuit (up to 15 feet away) after verifying safe amperage for the circuit. Secure wiring, mount the fixture, and install the trim piece.',
    price: 362,
    contractorPayoutAmount: 315,
  },
  // MISC
  {
    _category: 'bathroom',
    name: 'Paint',
    description:
      'Labor to paint a bathroom. Clean, scrape, sand, and patch up to 6 defects. Caulk gaps and spot prime. Roll or brush 2 coats of customer-purchased paint on walls and ceiling. Paint 1 door and door trim.',
    price: 1146,
    contractorPayoutAmount: 998,
  },
]

const tubAndShowerCombo = [
  // REMOVE
  {
    _category: 'bathroom',
    name: 'Remove Bathtub',
    description:
      'Labor to remove a bathtub and wall tile. Detach the bathtub from adjacent surfaces and components. Detach wall tile, mortar, and backing surface from the studs. Remove bathtub and wall tile from the home and dispose of them legally.',
    price: 1132,
    contractorPayoutAmount: 986,
  },
  {
    _category: 'bathroom',
    name: 'Remove Toilet',
    description:
      'Labor to remove a toilet. Disconnect the water supply and drain the unit. Remove mounting fasteners. Remove the toilet from the home and dispose of it legally.',
    price: 139,
    contractorPayoutAmount: 121,
  },
  {
    _category: 'bathroom',
    name: 'Remove Vanity',
    description:
      'Labor to remove a bathroom vanity. Detach from adjacent surfaces. Remove the vanity from the home and dispose of it legally.',
    price: 355,
    contractorPayoutAmount: 309,
  },
  {
    _category: 'bathroom',
    name: 'Remove Flooring',
    description:
      'Labor to remove one layer of bathroom floor tile on a wooden subfloor. Detach floor tile, mortar, and backing surface from the wooden subfloor. Remove floor tile from the home and dispose of it legally.',
    price: 345,
    contractorPayoutAmount: 300,
  },
  // INSTALL
  {
    _category: 'bathroom',
    name: 'Install Bathtub',
    description:
      'Labor to install a bathtub. For new unit installation only. Level the bathtub, install supports, and secure to the backer surface as necessary. Install contractor-purchased rough plumbing for drain and overflow.',
    price: 1325,
    contractorPayoutAmount: 1154,
  },
  {
    _category: 'bathroom',
    name: 'Install Waterproofing and Diverter',
    description:
      'Labor to install waterproofing in the wet area and rough-in plumbing for the diverter valve and fixture(s). Install customer-purchased diverter valve. Measure, fabricate, and secure contractor-purchased fixture rough-ins, tile backer board, and waterproofing to studs. The contractor will dry-lay the tile pattern and confirm with the homeowner.',
    price: 1205,
    contractorPayoutAmount: 1049,
  },
  {
    _category: 'bathroom',
    name: 'Install Wall Tile and Trim',
    description:
      'Labor to install wall tile and fixtures. Install customer-purchased tile with customer-purchased mortar, grout, caulk, and edge transition pieces. Install customer-purchased fixtures with the customer-purchased trim kit(s).',
    price: 2061,
    contractorPayoutAmount: 1795,
  },
  {
    _category: 'bathroom',
    name: 'Install Toilet',
    description:
      'Labor to install a toilet. Fit and secure new customer-purchased toilet. Connect to the existing water supply. Drain and leak test.',
    price: 368,
    contractorPayoutAmount: 320,
  },
  {
    _category: 'bathroom',
    name: 'Install Vanity',
    description:
      'Labor to install a bathroom vanity. Fabricate plumbing cutouts in the back panel. Level and secure customer-purchased vanity to the wall. Scribe, caulk, or apply molding at the exposed panel edge. Assemble and install drawers and hardware. Connect faucet and drain to existing plumbing connections. Install mirror or medicine cabinet.',
    price: 970,
    contractorPayoutAmount: 845,
  },
  {
    _category: 'bathroom',
    name: 'Install Flooring',
    description: `Labor to install the bathroom floor tile. Measure, fabricate, and secure contractor-purchased tile backer board to the subfloor. Dry-lay the tile pattern and confirm with the homeowner. Install customer-purchased tile with customer-purchased mortar, grout, caulk, and edge transition pieces.`,
    price: 918,
    contractorPayoutAmount: 799,
  },
  {
    _category: 'bathroom',
    name: 'Install Light',
    description:
      'Labor to install vanity light fixture. Mark the location, confirm with the homeowner, and cut the mounting hole. Wire from existing switched lighting circuit (up to 15 feet away) after verifying safe amperage for the circuit. Secure wiring, mount the fixture, and install the trim piece.',
    price: 362,
    contractorPayoutAmount: 315,
  },
  // MISC
  {
    _category: 'bathroom',
    name: 'Paint',
    description:
      'Labor to paint a bathroom. Clean, scrape, sand, and patch up to 6 defects. Caulk gaps and spot prime. Roll or brush 2 coats of customer-purchased paint on walls and ceiling. Paint 1 door and door trim.',
    price: 1146,
    contractorPayoutAmount: 998,
  },
]

const showerOnly = [
  // REMOVE
  {
    _category: 'bathroom',
    name: 'Remove Shower',
    description:
      'Labor to remove walk-in shower wall tile. Detach wall tile, mortar, and backing surface from the studs and subfloor. Remove wall and floor tile from the home and dispose of it legally.',
    price: 988,
    contractorPayoutAmount: 860,
  },
  {
    _category: 'bathroom',
    name: 'Remove Toilet',
    description:
      'Labor to remove a toilet. Disconnect the water supply and drain the unit. Remove mounting fasteners. Remove the toilet from the home and dispose of it legally.',
    price: 139,
    contractorPayoutAmount: 121,
  },
  {
    _category: 'bathroom',
    name: 'Remove Vanity',
    description:
      'Labor to remove a bathroom vanity. Detach from adjacent surfaces. Remove the vanity from the home and dispose of it legally.',
    price: 355,
    contractorPayoutAmount: 309,
  },
  {
    _category: 'bathroom',
    name: 'Remove Flooring',
    description:
      'Labor to remove one layer of bathroom floor tile on a wooden subfloor. Detach floor tile, mortar, and backing surface from the wooden subfloor. Remove floor tile from the home and dispose of it legally.',
    price: 345,
    contractorPayoutAmount: 300,
  },
  // INSTALL
  {
    _category: 'bathroom',
    name: 'Install Shower Floor and Curb',
    description:
      'Labor to build a graded floor for the walk-in shower and curb. Install contractor-purchased rough plumbing for the drain.',
    price: 811,
    contractorPayoutAmount: 706,
  },
  {
    _category: 'bathroom',
    name: 'Install Waterproofing and Diverter',
    description:
      'Labor to install waterproofing in the wet area and rough-in plumbing for the diverter valve and fixture(s). Install customer-purchased diverter valve. Measure, fabricate, and secure contractor-purchased fixture rough-ins, tile backer board, and waterproofing to studs. The contractor will dry-lay the tile pattern and confirm with the homeowner.',
    price: 1205,
    contractorPayoutAmount: 1049,
  },
  {
    _category: 'bathroom',
    name: 'Install Wall Tile and Trim',
    description:
      'Labor to install wall tile and fixtures. Install customer-purchased tile with customer-purchased mortar, grout, caulk, and edge transition pieces. Install customer-purchased fixtures with the customer-purchased trim kit(s).',
    price: 2061,
    contractorPayoutAmount: 1795,
  },
  {
    _category: 'bathroom',
    name: 'Install Toilet',
    description:
      'Labor to install a toilet. Fit and secure new customer-purchased toilet. Connect to the existing water supply. Drain and leak test.',
    price: 368,
    contractorPayoutAmount: 320,
  },
  {
    _category: 'bathroom',
    name: 'Install Vanity',
    description:
      'Labor to install a bathroom vanity. Fabricate plumbing cutouts in the back panel. Level and secure customer-purchased vanity to the wall. Scribe, caulk, or apply molding at the exposed panel edge. Assemble and install drawers and hardware. Connect faucet and drain to existing plumbing connections. Install mirror or medicine cabinet.',
    price: 970,
    contractorPayoutAmount: 845,
  },
  {
    _category: 'bathroom',
    name: 'Install Flooring',
    description: `Labor to install the bathroom floor tile. Measure, fabricate, and secure contractor-purchased tile backer board to the subfloor. Dry-lay the tile pattern and confirm with the homeowner. Install customer-purchased tile with customer-purchased mortar, grout, caulk, and edge transition pieces.`,
    price: 918,
    contractorPayoutAmount: 799,
  },
  {
    _category: 'bathroom',
    name: 'Install Light',
    description:
      'Labor to install vanity light fixture. Mark the location, confirm with the homeowner, and cut the mounting hole. Wire from existing switched lighting circuit (up to 15 feet away) after verifying safe amperage for the circuit. Secure wiring, mount the fixture, and install the trim piece.',
    price: 362,
    contractorPayoutAmount: 315,
  },
  // MISC
  {
    _category: 'bathroom',
    name: 'Paint',
    description:
      'Labor to paint a bathroom. Clean, scrape, sand, and patch up to 6 defects. Caulk gaps and spot prime. Roll or brush 2 coats of customer-purchased paint on walls and ceiling. Paint 1 door and door trim.',
    price: 1146,
    contractorPayoutAmount: 998,
  },
]

const separateTubAndShower = [
  // REMOVE
  {
    _category: 'bathroom',
    name: 'Remove Bathtub',
    description:
      'Labor to remove a bathtub and wall tile. Detach the bathtub from adjacent surfaces and components. Detach wall tile, mortar, and backing surface from the studs.  Remove bathtub and wall tile from the home and dispose of them legally.',
    price: 1132,
    contractorPayoutAmount: 986,
  },
  {
    _category: 'bathroom',
    name: 'Remove Shower',
    description:
      'Labor to remove walk-in shower wall tile. Detach wall tile, mortar, and backing surface from the studs and subfloor. Remove wall and floor tile from the home and dispose of it legally.',
    price: 988,
    contractorPayoutAmount: 860,
  },
  {
    _category: 'bathroom',
    name: 'Remove Toilet',
    description:
      'Labor to remove a toilet. Disconnect the water supply and drain the unit. Remove mounting fasteners. Remove the toilet from the home and dispose of it legally.',
    price: 139,
    contractorPayoutAmount: 121,
  },
  {
    _category: 'bathroom',
    name: 'Remove Vanity',
    description:
      'Labor to remove a bathroom vanity. Detach from adjacent surfaces. Remove the vanity from the home and dispose of it legally.',
    price: 355,
    contractorPayoutAmount: 309,
  },
  {
    _category: 'bathroom',
    name: 'Remove Flooring',
    description:
      'Labor to remove one layer of bathroom floor tile on a wooden subfloor. Detach floor tile, mortar, and backing surface from the wooden subfloor. Remove floor tile from the home and dispose of it legally.',
    price: 345,
    contractorPayoutAmount: 300,
  },
  // INSTALL
  {
    _category: 'bathroom',
    name: 'Install Bathtub',
    description:
      'Labor to install a bathtub. For new unit installation only. Level the bathtub, install supports, and secure to the backer surface as necessary. Install contractor-purchased rough plumbing for drain and overflow.',
    price: 1325,
    contractorPayoutAmount: 1154,
  },
  {
    _category: 'bathroom',
    name: 'Install Shower Floor and Curb',
    description:
      'Labor to build a graded floor for the walk-in shower and curb. Install contractor-purchased rough plumbing for the drain.',
    price: 811,
    contractorPayoutAmount: 706,
  },
  {
    _category: 'bathroom',
    name: 'Install Waterproofing and Diverter',
    description:
      'Labor to install waterproofing in the wet area and rough-in plumbing for the diverter valve and fixture(s). Install customer-purchased diverter valve. Measure, fabricate, and secure contractor-purchased fixture rough-ins, tile backer board, and waterproofing to studs. The contractor will dry-lay the tile pattern and confirm with the homeowner.',
    price: 2410,
    contractorPayoutAmount: 2098,
  },
  {
    _category: 'bathroom',
    name: 'Install Wall Tile and Trim',
    description:
      'Labor to install wall tile and fixtures. Install customer-purchased tile with customer-purchased mortar, grout, caulk, and edge transition pieces. Install customer-purchased fixtures with the customer-purchased trim kit(s).',
    price: 4122,
    contractorPayoutAmount: 3590,
  },
  {
    _category: 'bathroom',
    name: 'Install Toilet',
    description:
      'Labor to install a toilet. Fit and secure new customer-purchased toilet. Connect to the existing water supply. Drain and leak test.',
    price: 368,
    contractorPayoutAmount: 320,
  },
  {
    _category: 'bathroom',
    name: 'Install Vanity',
    description:
      'Labor to install vanity light fixture. Mark the location, confirm with the homeowner, and cut the mounting hole. Wire from existing switched lighting circuit (up to 15 feet away) after verifying safe amperage for the circuit. Secure wiring, mount the fixture, and install the trim piece.',
    price: 970,
    contractorPayoutAmount: 315,
  },
  {
    _category: 'bathroom',
    name: 'Install Flooring',
    description: `Labor to install the bathroom floor tile. Measure, fabricate, and secure contractor-purchased tile backer board to the subfloor. Dry-lay the tile pattern and confirm with the homeowner. Install customer-purchased tile with customer-purchased mortar, grout, caulk, and edge transition pieces.`,
    price: 918,
    contractorPayoutAmount: 799,
  },
  {
    _category: 'bathroom',
    name: 'Install Light',
    description:
      'Labor to install vanity light fixture. Mark the location, confirm with the homeowner, and cut the mounting hole. Wire from existing switched lighting circuit (up to 15 feet away) after verifying safe amperage for the circuit. Secure wiring, mount the fixture, and install the trim piece.',
    price: 362,
    contractorPayoutAmount: 315,
  },
  // MISC
  {
    _category: 'bathroom',
    name: 'Paint',
    description:
      'Labor to paint a bathroom. Clean, scrape, sand, and patch up to 6 defects. Caulk gaps and spot prime. Roll or brush 2 coats of customer-purchased paint on walls and ceiling. Paint 1 door and door trim.',
    price: 1146,
    contractorPayoutAmount: 998,
  },
]

const reservationFee = {
  _category: 'fee',
  name: 'Reservation',
  description: 'Lock your quote and reserve a start date for only $250.',
  price: 250,
  contractorPayoutAmount: 0,
}

const materialsCollectionPricing = {
  Efficiency: {
    powderRoom: 3297,
    tubAndShowerCombo: 6115,
    showerOnly: 7864,
    separateTubAndShower: 10683,
  },
  Tranquility: {
    powderRoom: 3190,
    tubAndShowerCombo: 5646,
    showerOnly: 7494,
    separateTubAndShower: 11625,
  },
  Essential: {
    powderRoom: 4013,
    tubAndShowerCombo: 6127,
    showerOnly: 7919,
    separateTubAndShower: 11360,
  },
  Serenity: {
    powderRoom: 3105,
    tubAndShowerCombo: 5296,
    showerOnly: 7075,
    separateTubAndShower: 9414,
  },
  Subtle: {
    powderRoom: 3105,
    tubAndShowerCombo: 5025,
    showerOnly: 7075,
    separateTubAndShower: 9456,
  },
  Grandeur: {
    powderRoom: 3655,
    tubAndShowerCombo: 5603,
    showerOnly: 7507,
    separateTubAndShower: 11906,
  },
}

const pricingBundles = {
  powderRoom,
  tubAndShowerCombo,
  showerOnly,
  separateTubAndShower,
}

// BUNDLE MAPPING
export const WASHINGTON_DC = {
  name,
  zipCodes,
  pricingBundles,
  materialsCollectionPricing,
  reservationFee,
}
