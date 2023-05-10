import { useMutation } from "react-query"

export const createEstimate = async ({
  phone,
  street,
  city,
  state,
  zip,
  place_id,
  url,
  layout,
  market,
}: createEstimateRequest) => {
  const body = JSON.stringify({
    phone,
    street,
    city,
    state,
    zip,
    place_id,
    url,
    layout,
    market,
  })

  const response = await fetch('/api/estimate/createEstimate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body,
  })

  const apiRes = await response.json()

  if (!response.ok) {
    console.error('Error: ', apiRes.error.message, apiRes.message)
    throw apiRes.error
  }

  return apiRes
}

export const useCreateEstimate = (config?: Record<string, unknown>) => {
  return useMutation(
    async (request: createEstimateRequest) => await createEstimate(request),
    { ...config }
  )
}

interface createEstimateRequest {
  phone: string
  street: string
  city: string
  state: string
  zip: number
  place_id: string
  url: string
  layout: string
  market: string
}
