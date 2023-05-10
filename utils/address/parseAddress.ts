const formFieldTypes = [
  'street_number',
  'route',
  'locality',
  'administrative_area_level_1',
  'postal_code',
]

export function parseAddress(addressFields, desiredFieldTypes = formFieldTypes) {
  const newAddressFields = addressFields
    .filter((field) => {
      const addressFieldTypes = field['types']
      return addressFieldTypes.some((type) => {
        return desiredFieldTypes.includes(type)
      })
    }, {})
    .map((obj) => obj['short_name'])

  const parsedAddress = {
    street: `${newAddressFields[0]} ${newAddressFields[1]}`,
    city: newAddressFields[2],
    state: newAddressFields[3],
    zip: newAddressFields[4],
  }

  return parsedAddress
}
