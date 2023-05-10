import React, { useState, useEffect, useRef } from 'react'
import clsx from 'clsx'

let autoComplete

const loadScript = (url, callback) => {
  const script = document.createElement('script')
  script.type = 'text/javascript'

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === 'loaded' || script.readyState === 'complete') {
        script.onreadystatechange = null
        callback()
      }
    }
  } else {
    script.onload = () => callback()
  }

  script.src = url
  document.getElementsByTagName('head')[0].appendChild(script)
}

function handleScriptLoad(
  updateQuery,
  setAddressObject,
  setAddressError,
  autoCompleteRef
) {
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    {
      types: ['address'],
      componentRestrictions: {
        country: 'us',
      },
    }
  )

  autoComplete.setFields([
    'place_id',
    'url',
    'types',
    'formatted_address',
    'address_components',
  ])

  autoComplete.addListener('place_changed', () => {
    handlePlaceSelect(updateQuery, setAddressObject, setAddressError)
  })
}

async function handlePlaceSelect(
  updateQuery,
  setAddressObject,
  setAddressError
) {
  const addressObject = autoComplete.getPlace()
  const { formatted_address, types } = addressObject
  const validAddress =
    types.includes('street_address') || types.includes('premise')

  updateQuery(formatted_address)

  if (validAddress) {
    setAddressError(null)
    updateQuery(formatted_address)
    return setAddressObject(addressObject)
  }

  setAddressError('Please enter a valid residential address')
  setTimeout(() => {
    updateQuery('')
  }, 2000)
}

export const GooglePlaceAutocomplete = ({
  setAddressObject,
  setAddressError,
  addressError,
  addressState = '',
}) => {
  const [query, setQuery] = useState(addressState ? addressState : '')
  const autoCompleteRef = useRef(null)

  const inputStyles = clsx(
    addressError
      ? 'border-red-300 text-red-900 placeholder-red-300  focus:ring-red-500 focus:border-red-500'
      : 'border-gray-300 placeholder-gray-400 focus:ring-slate-900',
    'block w-full px-5 py-3 border focus:outline-none rounded-md shadow-sm',
    'text-base text-gray-900 placeholder-gray-500'
  )

  function handleOnChange(event) {
    setQuery(event.target.value)
  }

  function handleOnKeyPress(event) {
    event.key === 'Enter' && event.preventDefault()
  }

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}&libraries=places`,
      () =>
        handleScriptLoad(
          setQuery,
          setAddressObject,
          setAddressError,
          autoCompleteRef
        )
    )
  }, [setAddressError, setAddressObject])

  return (
    <>
      <div className="font-sans">
        <div className="mt-1">
          <input
            type="text"
            name="address"
            id="address"
            aria-label="Project address"
            placeholder="Enter your project address"
            className={inputStyles}
            ref={autoCompleteRef}
            defaultValue={query}
            onChange={handleOnChange}
            onKeyPress={handleOnKeyPress}
          />
        </div>
        <p className="mt-1 block text-sm text-red-600">{addressError}</p>
      </div>
    </>
  )
}
