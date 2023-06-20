import { getUserToken } from '@utils/magic'
import { useMutation, useQuery } from 'react-query'

interface addHomeownerProps {
  firstName: string
  lastName: string
  email: string
  phone: string
  street?: string
  city?: string
  state?: string
  zip?: number
  additional?: string
}

const addHomeowner = async ({
  firstName,
  lastName,
  email,
  phone,
  street,
  city,
  state,
  zip,
  additional,
}: addHomeownerProps) => {
  const body = JSON.stringify({
    firstName,
    lastName,
    email,
    phone,
    street,
    city,
    state,
    zip,
    additional,
  })

  const response = await fetch('/api/homeowner/addHomeowner', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body,
  })

  const apiRes = await response.json()

  if (!response.ok) {
    console.error('Error:', apiRes)
    throw apiRes.error
  }

  return apiRes
}

export const useAddHomeowner = (config?: any) => {
  return useMutation(
    async (request: addHomeownerProps) => await addHomeowner(request),
    { ...config }
  )
}

/******************************************************************************/

const getHomeowner = async () => {
  const token = await getUserToken()

  return fetch('/api/homeowner/getHomeowner', {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((d) => d.json())
}

export const useGetHomeowner = (config?: any) => {
  return useQuery('homeowner', getHomeowner, { ...config })
}

/******************************************************************************/

interface updateHomeownerProfileRequest {
  firstName: string
  lastName: string
  phone: string
  email: string
}

const updateHomeownerProfile = async ({
  firstName,
  lastName,
  phone,
  email,
}: updateHomeownerProfileRequest) => {
  const token = await getUserToken()

  const body = JSON.stringify({
    firstName,
    lastName,
    phone,
    email,
  })

  const response = await fetch('/api/homeowner/updateHomeownerProfile', {
    method: 'PATCH',
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: body,
  })

  const apiRes = await response.json()

  if (!response.ok) {
    console.error('Error:', apiRes)
    throw apiRes.error
  }
}

export const useUpdateHomeownerProfile = (config?: any) => {
  return useMutation(
    async (request: updateHomeownerProfileRequest) =>
      await updateHomeownerProfile({ ...request }),
    { ...config }
  )
}
