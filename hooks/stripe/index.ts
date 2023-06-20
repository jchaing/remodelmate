import { getUserToken } from '@utils/magic'
import { useQuery } from 'react-query'

export async function fetchGetJSON(url: string) {
  try {
    const data = await fetch(url).then((res) => res.json())
    return data
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message)
    }
    throw err
  }
}

export async function fetchPostJSON(url: string, data?: {}) {
  const token = await getUserToken()
  try {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data || {}), // body data type must match "Content-Type" header
    })
    return await response.json() // parses JSON response into native JavaScript objects
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message)
    }
    throw err
  }
}

/******************************************************************************/

const getPaymentMethod = async () => {
  const token = await getUserToken()
  return fetch('/api/stripe/paymentMethod', {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((d) => d.json())
}

export const usePaymentMethod = (config?: any) => {
  return useQuery('paymentMethod', getPaymentMethod, { ...config })
}
