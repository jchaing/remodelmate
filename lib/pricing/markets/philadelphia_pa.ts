/* eslint-disable import/prefer-default-export */

// MARKET
const name = 'PHILADELPHIA_PA'

// ACTIVE ZIPS
const zipCodes = [
  19102, 19103, 19104, 19106, 19107, 19109, 19110, 19111, 19112, 19113, 19114,
  19115, 19116, 19118, 19119, 19120, 19121, 19122, 19123, 19124, 19125, 19126,
  19127, 19128, 19129, 19130, 19131, 19132, 19133, 19134, 19135, 19136, 19137,
  19138, 19139, 19140, 19141, 19142, 19143, 19144, 19145, 19146, 19147, 19148,
  19149, 19150, 19151, 19152, 19153, 19154,
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
    price: 493,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Remove Flooring',
    description:
      'Labor to remove bathroom floor tile with favorable site conditions. Detach tile, mortar, and backing surface from subfloor. Break into haulable pieces. Remove from home and dispose of legally. Includes area preparation and protection, costs to haul away old materials, installation waste, and associated debris.',
    price: 172,
    contractorPercentage: 60,
  },
  // INSTALL
  {
    _category: 'bathroom',
    name: 'Install Toilet',
    description:
      'Basic labor to install toilet with favorable site conditions. Fit and secure new customer-purchased toilet. Connect to existing water supply. Drain and leak test. Includes planning, equipment, and cost of related rough-in material acquisition and supplies typically required to install a toilet (fittings, mounting hardware, and connectors).',
    price: 638,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Install Vanity',
    description:
      'Basic labor to install a bathroom vanity with favorable site conditions. Fabricate plumbing cutouts in back panel. Level and secure customer-purchased vanity to wall. Scribe exposed panel edge to wall surface or apply molding at edge. Assemble, install drawers and customer-purchased hardware. Includes planning, equipment, and cost of related material acquisition and supplies typically required to install a bathroom vanity (fasteners and connectors).',
    price: 562,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Install Flooring',
    description: `Basic labor to install bathroom floor tile with favorable site conditions. Measure, fabricate and secure contractor-purchased tile backer board to subfloor. Layout tile pattern and confirm with homeowner. Install customer-purchased tile with customer-purchased thinset mortar, grout, caulk, and edge transition pieces. Includes planning, equipment, cost of related material acquisiton and supplies typically required to install bathroom floor tile (manufacter recommended underlayment, grout spacers) and specialty equipment used for job quality and efficiency (10" diameter diamond wet tile and stone saw, mortar box, and power mortar mixer).`,
    price: 779,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Install Light',
    description:
      'Basic labor to install wall-mounted lighting with favorable site conditions. Turn off power to circuit. Layout location, confirm with homeowner, and cut mounting hole. Add or modify wiring from existing switch or existing parallel fixture after verifying safe amperage for circuit. Connect and secure fixture. Secure wiring and install trim piece. Power and test. Includes planning, equipment, and cost of related rough-in material acquisiton and supplies typically required to install wall-mounted lighting (fittings, connectors, junction boxes, and fasteners).',
    price: 627,
    contractorPercentage: 60,
  },
  // MISC
  {
    _category: 'bathroom',
    name: 'Paint',
    description:
      'Basic labor to paint a bathroom with favorable site conditions. Clean, scrape, sand, and patch up to 4 defects per 100 square feet. Caulk edges and spot prime. Roll or brush 1 coat of primer and 2 coats of customer-purchased paint on walls and ceiling. Includes planning, equipment, and cost of related material acquistion and supplies typically required to paint a bathroom (masking tape and paper, drywall repair and preparation material, primers).',
    price: 730,
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
    price: 1133,
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
    price: 493,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Remove Flooring',
    description:
      'Labor to remove bathroom floor tile with favorable site conditions. Detach tile, mortar, and backing surface from subfloor. Break into haulable pieces. Remove from home and dispose of legally. Includes area preparation and protection, costs to haul away old materials, installation waste, and associated debris.',
    price: 383,
    contractorPercentage: 60,
  },
  // INSTALL
  {
    _category: 'bathroom',
    name: 'Install Tub',
    description:
      'Labor to install a bathtub with favorable site conditions. For new unit installation only. Install level ledger strip and leveling supports. Secure tub to wall and deck. Includes planning, equipment, and cost of related rough-in material acquisition and supplies typically required to install a bathtub (fittings, mounting hardware, and connectors), area preparation and protection, setup and clean up.',
    price: 604,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Install Waterproofing',
    description:
      'Labor to waterproof wet area with favorable site conditions. Measure, fabricate and secure contractor-purchased waterproofing and tile backer board to studs. Layout tile pattern and confirm with homeowner. Includes planning, equipment, and cost of related rough-in material acquisition and supplies typically required to waterproof the wet area (mounting hardware), area preparation and protection, setup and clean up.',
    price: 1410,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Install Tile',
    description:
      'Labor to install tile with favorable site conditions. Install customer-purchased tile with customer-purchased thinset mortar, grout, caulk, and edge transition pieces.  Includes planning, equipment, and cost of related rough-in material acquisition and supplies typically required to install tile (mounting hardware, grout spacers, and fittings), area preparation and protection, setup and clean up.',
    price: 2013,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Install Toilet',
    description:
      'Basic labor to install toilet with favorable site conditions. Fit and secure new customer-purchased toilet. Connect to existing water supply. Drain and leak test. Includes planning, equipment, and cost of related rough-in material acquisition and supplies typically required to install a toilet (fittings, mounting hardware, and connectors).',
    price: 638,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Install Vanity',
    description:
      'Basic labor to install a bathroom vanity with favorable site conditions. Fabricate plumbing cutouts in back panel. Level and secure customer-purchased vanity to wall. Scribe exposed panel edge to wall surface or apply molding at edge. Assemble, install drawers and customer-purchased hardware. Includes planning, equipment, and cost of related material acquisition and supplies typically required to install a bathroom vanity (fasteners and connectors).',
    price: 562,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Install Flooring',
    description: `Basic labor to install bathroom floor tile with favorable site conditions. Measure, fabricate and secure contractor-purchased tile backer board to subfloor. Layout tile pattern and confirm with homeowner. Install customer-purchased tile with customer-purchased thinset mortar, grout, caulk, and edge transition pieces. Includes planning, equipment, cost of related material acquisiton and supplies typically required to install bathroom floor tile (manufacter recommended underlayment, grout spacers) and specialty equipment used for job quality and efficiency (10" diameter diamond wet tile and stone saw, mortar box, and power mortar mixer).`,
    price: 1730,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Install Light',
    description:
      'Basic labor to install wall-mounted lighting with favorable site conditions. Turn off power to circuit. Layout location, confirm with homeowner, and cut mounting hole. Add or modify wiring from existing switch or existing parallel fixture after verifying safe amperage for circuit. Connect and secure fixture. Secure wiring and install trim piece. Power and test. Includes planning, equipment, and cost of related rough-in material acquisiton and supplies typically required to install wall-mounted lighting (fittings, connectors, junction boxes, and fasteners).',
    price: 627,
    contractorPercentage: 60,
  },
  // MISC
  {
    _category: 'bathroom',
    name: 'Paint',
    description:
      'Basic labor to paint a bathroom with favorable site conditions. Clean, scrape, sand, and patch up to 4 defects per 100 square feet. Caulk edges and spot prime. Roll or brush 1 coat of primer and 2 coats of customer-purchased paint on walls and ceiling. Includes planning, equipment, and cost of related material acquistion and supplies typically required to paint a bathroom (masking tape and paper, drywall repair and preparation material, primers).',
    price: 872,
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
    price: 1133,
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
    price: 493,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Remove Flooring',
    description:
      'Labor to remove bathroom floor tile with favorable site conditions. Detach tile, mortar, and backing surface from subfloor. Break into haulable pieces. Remove from home and dispose of legally. Includes area preparation and protection, costs to haul away old materials, installation waste, and associated debris.',
    price: 383,
    contractorPercentage: 60,
  },
  // INSTALL
  {
    _category: 'bathroom',
    name: 'Install Shower',
    description:
      'Labor to install a walk-in shower with favorable site conditions. For new unit installation only. Install level ledger strip and leveling supports. Secure shower pan to wall and deck. Includes planning, equipment, and cost of related rough-in material acquisition and supplies typically required to install a walk-in shower (fittings, mounting hardware, grout spacers and connectors), area preparation and protection, setup and clean up.',
    price: 446,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Install Waterproofing',
    description:
      'Labor to waterproof wet area with favorable site conditions. Measure, fabricate and secure contractor-purchased waterproofing and tile backer board to studs. Layout tile pattern and confirm with homeowner. Includes planning, equipment, and cost of related rough-in material acquisition and supplies typically required to waterproof the wet area (mounting hardware), area preparation and protection, setup and clean up.',
    price: 1781,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Install Tile',
    description:
      'Labor to install tile with favorable site conditions. Install customer-purchased tile with customer-purchased thinset mortar, grout, caulk, and edge transition pieces.  Includes planning, equipment, and cost of related rough-in material acquisition and supplies typically required to install tile (mounting hardware, grout spacers, and fittings), area preparation and protection, setup and clean up.',
    price: 2225,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Install Toilet',
    description:
      'Basic labor to install toilet with favorable site conditions. Fit and secure new customer-purchased toilet. Connect to existing water supply. Drain and leak test. Includes planning, equipment, and cost of related rough-in material acquisition and supplies typically required to install a toilet (fittings, mounting hardware, and connectors).',
    price: 638,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Install Vanity',
    description:
      'Basic labor to install a bathroom vanity with favorable site conditions. Fabricate plumbing cutouts in back panel. Level and secure customer-purchased vanity to wall. Scribe exposed panel edge to wall surface or apply molding at edge. Assemble, install drawers and customer-purchased hardware. Includes planning, equipment, and cost of related material acquisition and supplies typically required to install a bathroom vanity (fasteners and connectors).',
    price: 562,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Install Flooring',
    description: `Basic labor to install bathroom floor tile with favorable site conditions. Measure, fabricate and secure contractor-purchased tile backer board to subfloor. Layout tile pattern and confirm with homeowner. Install customer-purchased tile with customer-purchased thinset mortar, grout, caulk, and edge transition pieces. Includes planning, equipment, cost of related material acquisiton and supplies typically required to install bathroom floor tile (manufacter recommended underlayment, grout spacers) and specialty equipment used for job quality and efficiency (10" diameter diamond wet tile and stone saw, mortar box, and power mortar mixer).`,
    price: 1730,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Install Light',
    description:
      'Basic labor to install wall-mounted lighting with favorable site conditions. Turn off power to circuit. Layout location, confirm with homeowner, and cut mounting hole. Add or modify wiring from existing switch or existing parallel fixture after verifying safe amperage for circuit. Connect and secure fixture. Secure wiring and install trim piece. Power and test. Includes planning, equipment, and cost of related rough-in material acquisiton and supplies typically required to install wall-mounted lighting (fittings, connectors, junction boxes, and fasteners).',
    price: 627,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Install Shower Door',
    description: `Basic labor to install glass shower door with favorable site conditions. Fabricate and secure door frame to to wall structure. Set and adjust customer-purchased door. Caulk perimeter edges of door frame. Includes planning, equipment, and cost of related material acquisition and supplies typically required to install a glass shower door (mounting hardware, fasteners) and speciality equipment used for job quality and efficiency (pneumatic finish nailer, 10" miter saw, electric jigsaw, 3" belt sander, 3.25" electric planer).`,
    price: 757,
    contractorPercentage: 60,
  },
  // MISC
  {
    _category: 'bathroom',
    name: 'Paint',
    description:
      'Basic labor to paint a bathroom with favorable site conditions. Clean, scrape, sand, and patch up to 4 defects per 100 square feet. Caulk edges and spot prime. Roll or brush 1 coat of primer and 2 coats of customer-purchased paint on walls and ceiling. Includes planning, equipment, and cost of related material acquistion and supplies typically required to paint a bathroom (masking tape and paper, drywall repair and preparation material, primers).',
    price: 872,
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
    price: 1133,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Remove Shower',
    description:
      'Labor to remove a walk-in shower and wall tile with favorable site conditions. Detach shower pan from adjacent surfaces and components. Detach tile, mortar, and backing surface from studs and break into haulable pieces. Remove from home and dispose of legally. Includes area preparation and protection, costs to load and haul away old materials, installation waste, and associated debris.',
    price: 642,
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
    price: 493,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Remove Flooring',
    description:
      'Labor to remove bathroom floor tile with favorable site conditions. Detach tile, mortar, and backing surface from subfloor. Break into haulable pieces. Remove from home and dispose of legally. Includes area preparation and protection, costs to haul away old materials, installation waste, and associated debris.',
    price: 622,
    contractorPercentage: 60,
  },
  // INSTALL
  {
    _category: 'bathroom',
    name: 'Install Tub',
    description:
      'Labor to install a bathtub and wall tile with favorable site conditions. For new unit installation only. Install level ledger strip and leveling supports. Secure tub to wall and deck. Measure, fabricate and secure contractor-purchased waterproofing and tile backer board to studs. Layout tile pattern and confirm with homeowner. Install customer-purchased tile with customer-purchased thinset mortar, grout, caulk, and edge transition pieces. Includes planning, equipment, and cost of related rough-in material acquisition and supplies typically required to install a bathtub (fittings, mounting hardware, grout spacers, and connectors), area preparation and protection, setup and clean up.',
    price: 604,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Install Bathtub Waterproofing',
    description:
      'Labor to waterproof wet area with favorable site conditions. Measure, fabricate and secure contractor-purchased waterproofing and tile backer board to studs. Layout tile pattern and confirm with homeowner. Includes planning, equipment, and cost of related rough-in material acquisition and supplies typically required to waterproof the wet area (mounting hardware), area preparation and protection, setup and clean up.',
    price: 1410,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Install Bathtub Tile',
    description:
      'Labor to install tile with favorable site conditions. Install customer-purchased tile with customer-purchased thinset mortar, grout, caulk, and edge transition pieces.  Includes planning, equipment, and cost of related rough-in material acquisition and supplies typically required to install tile (mounting hardware, grout spacers, and fittings), area preparation and protection, setup and clean up.',
    price: 2013,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Install Shower',
    description:
      'Labor to install a walk-in shower and wall tile with favorable site conditions. For new unit installation only. Install level ledger strip and leveling supports. Secure shower pan to wall and deck. Includes planning, equipment, and cost of related rough-in material acquisition and supplies typically required to install a walk-in shower (fittings, mounting hardware, grout spacers and connectors), area preparation and protection, setup and clean up.',
    price: 446,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Install Shower Waterproofing',
    description:
      'Labor to waterproof wet area with favorable site conditions. Measure, fabricate and secure contractor-purchased waterproofing and tile backer board to studs. Layout tile pattern and confirm with homeowner. Includes planning, equipment, and cost of related rough-in material acquisition and supplies typically required to waterproof the wet area (mounting hardware), area preparation and protection, setup and clean up.',
    price: 1781,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Install Shower Tile',
    description:
      'Labor to install tile with favorable site conditions. Install customer-purchased tile with customer-purchased thinset mortar, grout, caulk, and edge transition pieces.  Includes planning, equipment, and cost of related rough-in material acquisition and supplies typically required to install tile (mounting hardware, grout spacers, and fittings), area preparation and protection, setup and clean up.',
    price: 2225,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Install Toilet',
    description:
      'Basic labor to install toilet with favorable site conditions. Fit and secure new customer-purchased toilet. Connect to existing water supply. Drain and leak test. Includes planning, equipment, and cost of related rough-in material acquisition and supplies typically required to install a toilet (fittings, mounting hardware, and connectors).',
    price: 638,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Install Vanity',
    description:
      'Basic labor to install a bathroom vanity with favorable site conditions. Fabricate plumbing cutouts in back panel. Level and secure customer-purchased vanity to wall. Scribe exposed panel edge to wall surface or apply molding at edge. Assemble, install drawers and customer-purchased hardware. Includes planning, equipment, and cost of related material acquisition and supplies typically required to install a bathroom vanity (fasteners and connectors).',
    price: 562,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Install Flooring',
    description: `Basic labor to install bathroom floor tile with favorable site conditions. Measure, fabricate and secure contractor-purchased tile backer board to subfloor. Layout tile pattern and confirm with homeowner. Install customer-purchased tile with customer-purchased thinset mortar, grout, caulk, and edge transition pieces. Includes planning, equipment, cost of related material acquisiton and supplies typically required to install bathroom floor tile (manufacter recommended underlayment, grout spacers) and specialty equipment used for job quality and efficiency (10" diameter diamond wet tile and stone saw, mortar box, and power mortar mixer).`,
    price: 2811,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Install Light',
    description:
      'Basic labor to install wall-mounted lighting with favorable site conditions. Turn off power to circuit. Layout location, confirm with homeowner, and cut mounting hole. Add or modify wiring from existing switch or existing parallel fixture after verifying safe amperage for circuit. Connect and secure fixture. Secure wiring and install trim piece. Power and test. Includes planning, equipment, and cost of related rough-in material acquisiton and supplies typically required to install wall-mounted lighting (fittings, connectors, junction boxes, and fasteners).',
    price: 627,
    contractorPercentage: 60,
  },
  {
    _category: 'bathroom',
    name: 'Install Shower Door',
    description: `Basic labor to install glass shower door with favorable site conditions. Fabricate and secure door frame to to wall structure. Set and adjust customer-purchased door. Caulk perimeter edges of door frame. Includes planning, equipment, and cost of related material acquisition and supplies typically required to install a glass shower door (mounting hardware, fasteners) and speciality equipment used for job quality and efficiency (pneumatic finish nailer, 10" miter saw, electric jigsaw, 3" belt sander, 3.25" electric planer).`,
    price: 757,
    contractorPercentage: 60,
  },
  // MISC
  {
    _category: 'bathroom',
    name: 'Paint',
    description:
      'Basic labor to paint a bathroom with favorable site conditions. Clean, scrape, sand, and patch up to 4 defects per 100 square feet. Caulk edges and spot prime. Roll or brush 1 coat of primer and 2 coats of customer-purchased paint on walls and ceiling. Includes planning, equipment, and cost of related material acquistion and supplies typically required to paint a bathroom (masking tape and paper, drywall repair and preparation material, primers).',
    price: 1209,
    contractorPercentage: 60,
  },
]

// BUNDLE MAPPING
const pricingBundles = {
  powderRoom,
  tubAndShowerCombo,
  showerOnly,
  separateTubAndShower,
}

export const PHILADELPHIA_PA = {
  name,
  zipCodes,
  pricingBundles,
}
