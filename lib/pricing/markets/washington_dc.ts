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
  // FEES
  {
    _category: 'fee',
    name: 'Booking',
    description: 'Lock your quote and reserve a start date for only $250.',
    price: 250,
    contractorPercentage: 0,
  },
  {
    _category: 'fee',
    name: '3D Design',
    description:
      '3D illustration of your new bathroom from two perspectives. Includes 3 revisions and a full materials list.',
    price: 499,
    contractorPercentage: 60,
  },
  // REMOVE
  {
    _category: 'bathroom',
    name: 'Remove Toilet',
    description:
      'Labor to remove a toilet with favorable site conditions. Disconnect water suppply and drain unit. Remove mounting fasteners. Remove from home and dispose of legally. Includes area preparation and protection, costs to load and haul away old materials, installation waste, and associated debris. ',
    price: 230,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Remove Vanity',
    description:
      'Labor to remove a bathroom vanity with favorable site conditions. Detach from adjacent surfaces. Remove from home and dispose of legally. Includes area preparation and protection, costs to load and haul away old materials, installation waste, and associated debris.',
    price: 530,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Remove Flooring',
    description:
      'Labor to remove bathroom floor tile with favorable site conditions. Detach tile, mortar, and backing surface from subfloor. Break into haulable pieces. Remove from home and dispose of legally. Includes area preparation and protection, costs to haul away old materials, installation waste, and associated debris.',
    price: 310,
    contractorPercentage: 60,
  },
  // INSTALL
  {
    _category: 'bathroom',
    name: 'Install Toilet',
    description:
      'Basic labor to install toilet with favorable site conditions. Fit and secure new customer-purchased toilet. Connect to existing water supply. Drain and leak test. Includes planning, equipment, and cost of related rough-in material acquisition and supplies typically required to install a toilet (fittings, mounting hardware, and connectors).',
    price: 680,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Install Vanity',
    description:
      'Basic labor to install a bathroom vanity with favorable site conditions. Fabricate plumbing cutouts in back panel. Level and secure customer-purchased vanity to wall. Scribe exposed panel edge to wall surface or apply molding at edge. Assemble, install drawers and customer-purchased hardware. Includes planning, equipment, and cost of related material acquisition and supplies typically required to install a bathroom vanity (fasteners and connectors).',
    price: 595,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Install Flooring',
    description: `Basic labor to install bathroom floor tile with favorable site conditions. Measure, fabricate and secure contractor-purchased tile backer board to subfloor. Layout tile pattern and confirm with homeowner. Install customer-purchased tile with customer-purchased thinset mortar, grout, caulk, and edge transition pieces. Includes planning, equipment, cost of related material acquisiton and supplies typically required to install bathroom floor tile (manufacter recommended underlayment, grout spacers) and specialty equipment used for job quality and efficiency (10" diameter diamond wet tile and stone saw, mortar box, and power mortar mixer).`,
    price: 1250,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Install Light',
    description:
      'Basic labor to install wall-mounted lighting with favorable site conditions. Turn off power to circuit. Layout location, confirm with homeowner, and cut mounting hole. Add or modify wiring from existing switch or existing parallel fixture after verifying safe amperage for circuit. Connect and secure fixture. Secure wiring and install trim piece. Power and test. Includes planning, equipment, and cost of related rough-in material acquisiton and supplies typically required to install wall-mounted lighting (fittings, connectors, junction boxes, and fasteners).',
    price: 710,
    contractorPercentage: 60,
  },
  // MISC
  {
    _category: 'bathroom',
    name: 'Paint',
    description:
      'Basic labor to paint a bathroom with favorable site conditions. Clean, scrape, sand, and patch up to 4 defects per 100 square feet. Caulk edges and spot prime. Roll or brush 1 coat of primer and 2 coats of customer-purchased paint on walls and ceiling. Includes planning, equipment, and cost of related material acquistion and supplies typically required to paint a bathroom (masking tape and paper, drywall repair and preparation material, primers).',
    price: 1340,
    contractorPercentage: 60,
  },
]

const tubAndShowerCombo = [
  // FEES
  {
    _category: 'fee',
    name: 'Booking',
    description: 'Lock your quote and reserve a start date for only $250.',
    price: 250,
    contractorPercentage: 0,
  },
  {
    _category: 'fee',
    name: '3D Design',
    description:
      '3D illustration of your new bathroom from two perspectives. Includes 3 revisions and a full materials list.',
    price: 899,
    contractorPercentage: 55.5562,
  },
  // REMOVE
  {
    _category: 'bathroom',
    name: 'Remove Tub',
    description:
      'Labor to remove a bathtub and wall tile with favorable site conditions. Detach bathtub from adjacent surfaces and components. Detach tile, mortar, and backing surface from studs and break into haulable pieces. Remove from home and dispose of legally. Includes area preparation and protection, costs to load and haul away old materials, installation waste, and associated debris.',
    price: 1375,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Remove Toilet',
    description:
      'Labor to remove a toilet with favorable site conditions. Disconnect water suppply and drain unit. Remove mounting fasteners. Remove from home and dispose of legally. Includes area preparation and protection, costs to load and haul away old materials, installation waste, and associated debris. ',
    price: 230,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Remove Vanity',
    description:
      'Labor to remove a bathroom vanity with favorable site conditions. Detach from adjacent surfaces. Remove from home and dispose of legally. Includes area preparation and protection, costs to load and haul away old materials, installation waste, and associated debris.',
    price: 530,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Remove Flooring',
    description:
      'Labor to remove bathroom floor tile with favorable site conditions. Detach tile, mortar, and backing surface from subfloor. Break into haulable pieces. Remove from home and dispose of legally. Includes area preparation and protection, costs to haul away old materials, installation waste, and associated debris.',
    price: 500,
    contractorPercentage: 60,
  },
  // INSTALL
  {
    _category: 'bathroom',
    name: 'Install Tub',
    description:
      'Labor to install a bathtub with favorable site conditions. For new unit installation only. Install level ledger strip and leveling supports. Secure tub to wall and deck. Includes planning, equipment, and cost of related rough-in material acquisition and supplies typically required to install a bathtub (fittings, mounting hardware, and connectors), area preparation and protection, setup and clean up.',
    price: 931,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Install Waterproofing',
    description:
      'Labor to waterproof wet area with favorable site conditions. Measure, fabricate and secure contractor-purchased waterproofing and tile backer board to studs. Layout tile pattern and confirm with homeowner. Includes planning, equipment, and cost of related rough-in material acquisition and supplies typically required to waterproof the wet area (mounting hardware), area preparation and protection, setup and clean up.',
    price: 2172,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Install Tile',
    description:
      'Labor to install tile with favorable site conditions. Install customer-purchased tile with customer-purchased thinset mortar, grout, caulk, and edge transition pieces.  Includes planning, equipment, and cost of related rough-in material acquisition and supplies typically required to install tile (mounting hardware, grout spacers, and fittings), area preparation and protection, setup and clean up.',
    price: 3102,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Install Toilet',
    description:
      'Basic labor to install toilet with favorable site conditions. Fit and secure new customer-purchased toilet. Connect to existing water supply. Drain and leak test. Includes planning, equipment, and cost of related rough-in material acquisition and supplies typically required to install a toilet (fittings, mounting hardware, and connectors).',
    price: 680,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Install Vanity',
    description:
      'Basic labor to install a bathroom vanity with favorable site conditions. Fabricate plumbing cutouts in back panel. Level and secure customer-purchased vanity to wall. Scribe exposed panel edge to wall surface or apply molding at edge. Assemble, install drawers and customer-purchased hardware. Includes planning, equipment, and cost of related material acquisition and supplies typically required to install a bathroom vanity (fasteners and connectors).',
    price: 595,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Install Flooring',
    description: `Basic labor to install bathroom floor tile with favorable site conditions. Measure, fabricate and secure contractor-purchased tile backer board to subfloor. Layout tile pattern and confirm with homeowner. Install customer-purchased tile with customer-purchased thinset mortar, grout, caulk, and edge transition pieces. Includes planning, equipment, cost of related material acquisiton and supplies typically required to install bathroom floor tile (manufacter recommended underlayment, grout spacers) and specialty equipment used for job quality and efficiency (10" diameter diamond wet tile and stone saw, mortar box, and power mortar mixer).`,
    price: 2000,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Install Light',
    description:
      'Basic labor to install wall-mounted lighting with favorable site conditions. Turn off power to circuit. Layout location, confirm with homeowner, and cut mounting hole. Add or modify wiring from existing switch or existing parallel fixture after verifying safe amperage for circuit. Connect and secure fixture. Secure wiring and install trim piece. Power and test. Includes planning, equipment, and cost of related rough-in material acquisiton and supplies typically required to install wall-mounted lighting (fittings, connectors, junction boxes, and fasteners).',
    price: 710,
    contractorPercentage: 60,
  },
  // MISC
  {
    _category: 'bathroom',
    name: 'Paint',
    description:
      'Basic labor to paint a bathroom with favorable site conditions. Clean, scrape, sand, and patch up to 4 defects per 100 square feet. Caulk edges and spot prime. Roll or brush 1 coat of primer and 2 coats of customer-purchased paint on walls and ceiling. Includes planning, equipment, and cost of related material acquistion and supplies typically required to paint a bathroom (masking tape and paper, drywall repair and preparation material, primers).',
    price: 1550,
    contractorPercentage: 60,
  },
]

const showerOnly = [
  // FEES
  {
    _category: 'fee',
    name: 'Booking',
    description: 'Lock your quote and reserve a start date for only $250.',
    price: 250,
    contractorPercentage: 0,
  },
  {
    _category: 'fee',
    name: '3D Design',
    description:
      '3D illustration of your new bathroom from two perspectives. Includes 3 revisions and a full materials list.',
    price: 899,
    contractorPercentage: 55.5562,
  },
  // REMOVE
  {
    _category: 'bathroom',
    name: 'Remove Shower',
    description:
      'Labor to remove a walk-in shower and wall tile with favorable site conditions. Detach shower pan from adjacent surfaces and components. Detach tile, mortar, and backing surface from studs and break into haulable pieces. Remove from home and dispose of legally. Includes area preparation and protection, costs to load and haul away old materials, installation waste, and associated debris.',
    price: 1375,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Remove Toilet',
    description:
      'Labor to remove a toilet with favorable site conditions. Disconnect water suppply and drain unit. Remove mounting fasteners. Remove from home and dispose of legally. Includes area preparation and protection, costs to load and haul away old materials, installation waste, and associated debris. ',
    price: 230,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Remove Vanity',
    description:
      'Labor to remove a bathroom vanity with favorable site conditions. Detach from adjacent surfaces. Remove from home and dispose of legally. Includes area preparation and protection, costs to load and haul away old materials, installation waste, and associated debris.',
    price: 530,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Remove Flooring',
    description:
      'Labor to remove bathroom floor tile with favorable site conditions. Detach tile, mortar, and backing surface from subfloor. Break into haulable pieces. Remove from home and dispose of legally. Includes area preparation and protection, costs to haul away old materials, installation waste, and associated debris.',
    price: 500,
    contractorPercentage: 60,
  },
  // INSTALL
  {
    _category: 'bathroom',
    name: 'Install Shower',
    description:
      'Labor to install a walk-in shower with favorable site conditions. For new unit installation only. Install level ledger strip and leveling supports. Secure shower pan to wall and deck. Includes planning, equipment, and cost of related rough-in material acquisition and supplies typically required to install a walk-in shower (fittings, mounting hardware, grout spacers and connectors), area preparation and protection, setup and clean up.',
    price: 700,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Install Waterproofing',
    description:
      'Labor to waterproof wet area with favorable site conditions. Measure, fabricate and secure contractor-purchased waterproofing and tile backer board to studs. Layout tile pattern and confirm with homeowner. Includes planning, equipment, and cost of related rough-in material acquisition and supplies typically required to waterproof the wet area (mounting hardware), area preparation and protection, setup and clean up.',
    price: 2798,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Install Tile',
    description:
      'Labor to install tile with favorable site conditions. Install customer-purchased tile with customer-purchased thinset mortar, grout, caulk, and edge transition pieces.  Includes planning, equipment, and cost of related rough-in material acquisition and supplies typically required to install tile (mounting hardware, grout spacers, and fittings), area preparation and protection, setup and clean up.',
    price: 3497,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Install Toilet',
    description:
      'Basic labor to install toilet with favorable site conditions. Fit and secure new customer-purchased toilet. Connect to existing water supply. Drain and leak test. Includes planning, equipment, and cost of related rough-in material acquisition and supplies typically required to install a toilet (fittings, mounting hardware, and connectors).',
    price: 680,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Install Vanity',
    description:
      'Basic labor to install a bathroom vanity with favorable site conditions. Fabricate plumbing cutouts in back panel. Level and secure customer-purchased vanity to wall. Scribe exposed panel edge to wall surface or apply molding at edge. Assemble, install drawers and customer-purchased hardware. Includes planning, equipment, and cost of related material acquisition and supplies typically required to install a bathroom vanity (fasteners and connectors).',
    price: 595,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Install Flooring',
    description: `Basic labor to install bathroom floor tile with favorable site conditions. Measure, fabricate and secure contractor-purchased tile backer board to subfloor. Layout tile pattern and confirm with homeowner. Install customer-purchased tile with customer-purchased thinset mortar, grout, caulk, and edge transition pieces. Includes planning, equipment, cost of related material acquisiton and supplies typically required to install bathroom floor tile (manufacter recommended underlayment, grout spacers) and specialty equipment used for job quality and efficiency (10" diameter diamond wet tile and stone saw, mortar box, and power mortar mixer).`,
    price: 2000,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Install Light',
    description:
      'Basic labor to install wall-mounted lighting with favorable site conditions. Turn off power to circuit. Layout location, confirm with homeowner, and cut mounting hole. Add or modify wiring from existing switch or existing parallel fixture after verifying safe amperage for circuit. Connect and secure fixture. Secure wiring and install trim piece. Power and test. Includes planning, equipment, and cost of related rough-in material acquisiton and supplies typically required to install wall-mounted lighting (fittings, connectors, junction boxes, and fasteners).',
    price: 710,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Install Shower Door',
    description: `Basic labor to install glass shower door with favorable site conditions. Fabricate and secure door frame to to wall structure. Set and adjust customer-purchased door. Caulk perimeter edges of door frame. Includes planning, equipment, and cost of related material acquisition and supplies typically required to install a glass shower door (mounting hardware, fasteners) and speciality equipment used for job quality and efficiency (pneumatic finish nailer, 10" miter saw, electric jigsaw, 3" belt sander, 3.25" electric planer).`,
    price: 870,
    contractorPercentage: 60,
  },
  // MISC
  {
    _category: 'bathroom',
    name: 'Paint',
    description:
      'Basic labor to paint a bathroom with favorable site conditions. Clean, scrape, sand, and patch up to 4 defects per 100 square feet. Caulk edges and spot prime. Roll or brush 1 coat of primer and 2 coats of customer-purchased paint on walls and ceiling. Includes planning, equipment, and cost of related material acquistion and supplies typically required to paint a bathroom (masking tape and paper, drywall repair and preparation material, primers).',
    price: 1550,
    contractorPercentage: 60,
  },
]

const separateTubAndShower = [
  // FEES
  {
    _category: 'fee',
    name: 'Booking',
    description: 'Lock your quote and reserve a start date for only $250.',
    price: 250,
    contractorPercentage: 0,
  },
  {
    _category: 'fee',
    name: '3D Design',
    description:
      '3D illustration of your new bathroom from two perspectives. Includes 3 revisions and a full materials list.',
    price: 899,
    contractorPercentage: 55.5562,
  },
  // REMOVE
  {
    _category: 'bathroom',
    name: 'Remove Tub',
    description:
      'Labor to remove a bathtub and wall tile with favorable site conditions. Detach bathtub from adjacent surfaces and components. Detach tile, mortar, and backing surface from studs and break into haulable pieces. Remove from home and dispose of legally. Includes area preparation and protection, costs to load and haul away old materials, installation waste, and associated debris.',
    price: 1375,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Remove Shower',
    description:
      'Labor to remove a walk-in shower and wall tile with favorable site conditions. Detach shower pan from adjacent surfaces and components. Detach tile, mortar, and backing surface from studs and break into haulable pieces. Remove from home and dispose of legally. Includes area preparation and protection, costs to load and haul away old materials, installation waste, and associated debris.',
    price: 688,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Remove Toilet',
    description:
      'Labor to remove a toilet with favorable site conditions. Disconnect water suppply and drain unit. Remove mounting fasteners. Remove from home and dispose of legally. Includes area preparation and protection, costs to load and haul away old materials, installation waste, and associated debris. ',
    price: 230,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Remove Vanity',
    description:
      'Labor to remove a bathroom vanity with favorable site conditions. Detach from adjacent surfaces. Remove from home and dispose of legally. Includes area preparation and protection, costs to load and haul away old materials, installation waste, and associated debris.',
    price: 530,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Remove Flooring',
    description:
      'Labor to remove bathroom floor tile with favorable site conditions. Detach tile, mortar, and backing surface from subfloor. Break into haulable pieces. Remove from home and dispose of legally. Includes area preparation and protection, costs to haul away old materials, installation waste, and associated debris.',
    price: 750,
    contractorPercentage: 60,
  },
  // INSTALL
  {
    _category: 'bathroom',
    name: 'Install Tub',
    description:
      'Labor to install a bathtub and wall tile with favorable site conditions. For new unit installation only. Install level ledger strip and leveling supports. Secure tub to wall and deck. Measure, fabricate and secure contractor-purchased waterproofing and tile backer board to studs. Layout tile pattern and confirm with homeowner. Install customer-purchased tile with customer-purchased thinset mortar, grout, caulk, and edge transition pieces. Includes planning, equipment, and cost of related rough-in material acquisition and supplies typically required to install a bathtub (fittings, mounting hardware, grout spacers, and connectors), area preparation and protection, setup and clean up.',
    price: 931,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Install Bathtub Waterproofing',
    description:
      'Labor to waterproof wet area with favorable site conditions. Measure, fabricate and secure contractor-purchased waterproofing and tile backer board to studs. Layout tile pattern and confirm with homeowner. Includes planning, equipment, and cost of related rough-in material acquisition and supplies typically required to waterproof the wet area (mounting hardware), area preparation and protection, setup and clean up.',
    price: 2172,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Install Bathtub Tile',
    description:
      'Labor to install tile with favorable site conditions. Install customer-purchased tile with customer-purchased thinset mortar, grout, caulk, and edge transition pieces.  Includes planning, equipment, and cost of related rough-in material acquisition and supplies typically required to install tile (mounting hardware, grout spacers, and fittings), area preparation and protection, setup and clean up.',
    price: 3102,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Install Shower',
    description:
      'Labor to install a walk-in shower and wall tile with favorable site conditions. For new unit installation only. Install level ledger strip and leveling supports. Secure shower pan to wall and deck. Includes planning, equipment, and cost of related rough-in material acquisition and supplies typically required to install a walk-in shower (fittings, mounting hardware, grout spacers and connectors), area preparation and protection, setup and clean up.',
    price: 700,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Install Shower Waterproofing',
    description:
      'Labor to waterproof wet area with favorable site conditions. Measure, fabricate and secure contractor-purchased waterproofing and tile backer board to studs. Layout tile pattern and confirm with homeowner. Includes planning, equipment, and cost of related rough-in material acquisition and supplies typically required to waterproof the wet area (mounting hardware), area preparation and protection, setup and clean up.',
    price: 2798,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Install Shower Tile',
    description:
      'Labor to install tile with favorable site conditions. Install customer-purchased tile with customer-purchased thinset mortar, grout, caulk, and edge transition pieces.  Includes planning, equipment, and cost of related rough-in material acquisition and supplies typically required to install tile (mounting hardware, grout spacers, and fittings), area preparation and protection, setup and clean up.',
    price: 3497,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Install Toilet',
    description:
      'Basic labor to install toilet with favorable site conditions. Fit and secure new customer-purchased toilet. Connect to existing water supply. Drain and leak test. Includes planning, equipment, and cost of related rough-in material acquisition and supplies typically required to install a toilet (fittings, mounting hardware, and connectors).',
    price: 680,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Install Vanity',
    description:
      'Basic labor to install a bathroom vanity with favorable site conditions. Fabricate plumbing cutouts in back panel. Level and secure customer-purchased vanity to wall. Scribe exposed panel edge to wall surface or apply molding at edge. Assemble, install drawers and customer-purchased hardware. Includes planning, equipment, and cost of related material acquisition and supplies typically required to install a bathroom vanity (fasteners and connectors).',
    price: 595,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Install Flooring',
    description: `Basic labor to install bathroom floor tile with favorable site conditions. Measure, fabricate and secure contractor-purchased tile backer board to subfloor. Layout tile pattern and confirm with homeowner. Install customer-purchased tile with customer-purchased thinset mortar, grout, caulk, and edge transition pieces. Includes planning, equipment, cost of related material acquisiton and supplies typically required to install bathroom floor tile (manufacter recommended underlayment, grout spacers) and specialty equipment used for job quality and efficiency (10" diameter diamond wet tile and stone saw, mortar box, and power mortar mixer).`,
    price: 3000,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Install Light',
    description:
      'Basic labor to install wall-mounted lighting with favorable site conditions. Turn off power to circuit. Layout location, confirm with homeowner, and cut mounting hole. Add or modify wiring from existing switch or existing parallel fixture after verifying safe amperage for circuit. Connect and secure fixture. Secure wiring and install trim piece. Power and test. Includes planning, equipment, and cost of related rough-in material acquisiton and supplies typically required to install wall-mounted lighting (fittings, connectors, junction boxes, and fasteners).',
    price: 710,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Install Shower Door',
    description: `Basic labor to install glass shower door with favorable site conditions. Fabricate and secure door frame to to wall structure. Set and adjust customer-purchased door. Caulk perimeter edges of door frame. Includes planning, equipment, and cost of related material acquisition and supplies typically required to install a glass shower door (mounting hardware, fasteners) and speciality equipment used for job quality and efficiency (pneumatic finish nailer, 10" miter saw, electric jigsaw, 3" belt sander, 3.25" electric planer).`,
    price: 870,
    contractorPercentage: 60,
  },
  // MISC
  {
    _category: 'bathroom',
    name: 'Paint',
    description:
      'Basic labor to paint a bathroom with favorable site conditions. Clean, scrape, sand, and patch up to 4 defects per 100 square feet. Caulk edges and spot prime. Roll or brush 1 coat of primer and 2 coats of customer-purchased paint on walls and ceiling. Includes planning, equipment, and cost of related material acquistion and supplies typically required to paint a bathroom (masking tape and paper, drywall repair and preparation material, primers).',
    price: 2000,
    contractorPercentage: 60,
  },
]

// Bundle Mapping
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
}
